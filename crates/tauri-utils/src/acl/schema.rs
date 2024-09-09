// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Schema generation for ACL items.

use std::{
  collections::BTreeMap,
  fs,
  path::{Path, PathBuf},
};

use schemars::schema::*;

use super::Error;
use crate::{platform::Target, write_if_changed};

use super::{
  build::PERMISSION_SCHEMAS_FOLDER_NAME,
  capability::CapabilityFile,
  manifest::{Manifest, PermissionFile},
  Permission, PermissionSet, PERMISSION_SCHEMA_FILE_NAME,
};

/// Capability schema file name.
pub const CAPABILITIES_SCHEMA_FILE_NAME: &str = "schema.json";
/// Path of the folder where schemas are saved.
pub const CAPABILITIES_SCHEMA_FOLDER_PATH: &str = "gen/schemas";

/// Permission schema generator trait
pub trait PermissionSchemaGenerator {
  /// Whether has a default permission set or not.
  fn has_default_permission_set(&self) -> bool;

  /// Default permission set description if any.
  fn default_set_description(&self) -> Option<&str>;

  /// Permissions sets to generate schema for.
  fn permission_sets(&self) -> impl Iterator<Item = &PermissionSet>;

  /// Permissions to generate schema for.
  fn permissions(&self) -> impl Iterator<Item = &Permission>;

  /// A utility function to generate a schema for a permission identifier
  fn perm_id_schema(name: Option<&str>, id: &str, description: Option<&str>) -> Schema {
    let command_name = match name {
      Some(name) if name == super::APP_ACL_KEY => id.to_string(),
      Some(name) => format!("{name}:{id}"),
      _ => id.to_string(),
    };

    Schema::Object(SchemaObject {
      metadata: Some(Box::new(Metadata {
        description: description.map(ToString::to_string),
        ..Default::default()
      })),
      instance_type: Some(InstanceType::String.into()),
      const_value: Some(serde_json::Value::String(command_name)),
      ..Default::default()
    })
  }

  /// Generate schemas for all possible permissions.
  fn gen_possible_permission_schemas(&self, name: Option<&str>) -> Vec<Schema> {
    let mut permission_schemas = Vec::new();

    // schema for default set
    if self.has_default_permission_set() {
      let default = Self::perm_id_schema(name, "default", self.default_set_description());
      permission_schemas.push(default);
    }

    // schema for each permission set
    for set in self.permission_sets() {
      let schema = Self::perm_id_schema(name, &set.identifier, Some(&set.description));
      permission_schemas.push(schema);
    }

    // schema for each permission
    for perm in self.permissions() {
      let schema = Self::perm_id_schema(name, &perm.identifier, perm.description.as_deref());
      permission_schemas.push(schema);
    }

    permission_schemas
  }
}

impl PermissionSchemaGenerator for Manifest {
  fn has_default_permission_set(&self) -> bool {
    self.default_permission.is_some()
  }

  fn default_set_description(&self) -> Option<&str> {
    self
      .default_permission
      .as_ref()
      .map(|d| d.description.as_str())
  }

  fn permission_sets(&self) -> impl Iterator<Item = &PermissionSet> {
    self.permission_sets.values()
  }

  fn permissions(&self) -> impl Iterator<Item = &Permission> {
    self.permissions.values()
  }
}

impl PermissionSchemaGenerator for PermissionFile {
  fn has_default_permission_set(&self) -> bool {
    self.default.is_some()
  }

  fn default_set_description(&self) -> Option<&str> {
    self.default.as_ref().and_then(|d| d.description.as_deref())
  }

  fn permission_sets(&self) -> impl Iterator<Item = &PermissionSet> {
    self.set.iter()
  }

  fn permissions(&self) -> impl Iterator<Item = &Permission> {
    self.permission.iter()
  }
}

/// Collect and include all possible identifiers in `Identifier` defintion in the schema
fn extend_identifier_schema(schema: &mut RootSchema, acl: &BTreeMap<String, Manifest>) {
  if let Some(Schema::Object(identifier_schema)) = schema.definitions.get_mut("Identifier") {
    let permission_schemas = acl
      .iter()
      .map(|(name, manifest)| manifest.gen_possible_permission_schemas(Some(&name)))
      .flatten()
      .collect::<Vec<_>>();

    let new_subschemas = Box::new(SubschemaValidation {
      one_of: Some(permission_schemas.clone()),
      ..Default::default()
    });

    identifier_schema.subschemas = Some(new_subschemas);
    identifier_schema.object = None;
    identifier_schema.instance_type = None;
    identifier_schema.metadata().description = Some("Permission identifier".to_string());
  }
}

/// Collect permission schemas and its associated scope schema and schema definitons from plugins
/// and replace `PermissionEntry` extend object syntax with a new schema that does conditional
/// checks to serve the relavent scope schema for the right permissions schema, in a nutshell, it
/// will look something like this:
/// ```text
/// PermissionEntry {
///   anyOf {
///     String,  // default string syntax
///     Object { // extended object syntax
///       allOf { // JSON allOf is used but actually means anyOf
///         {
///           "if": "identifier" property anyOf "fs" plugin permission,
///           "then": add "allow" and "deny" properties that match "fs" plugin scope schema
///         },
///         {
///           "if": "identifier" property anyOf "http" plugin permission,
///           "then": add "allow" and "deny" properties that match "http" plugin scope schema
///         },
///         ...etc,
///         {
///           No "if" or "then", just "allow" and "deny" properties with default "#/definitions/Value"
///         },
///       }
///     }
///   }
/// }
/// ```
fn extend_permission_entry_schema(root_schema: &mut RootSchema, acl: &BTreeMap<String, Manifest>) {
  const IDENTIFIER: &str = "identifier";
  const ALLOW: &str = "allow";
  const DENY: &str = "deny";

  let mut collected_defs = vec![];

  if let Some(Schema::Object(obj)) = root_schema.definitions.get_mut("PermissionEntry") {
    let any_of = obj.subschemas().any_of.as_mut().unwrap();
    let Schema::Object(extened_permission_entry) = any_of.last_mut().unwrap() else {
      unreachable!("PermissionsEntry should be an object not a boolean");
    };

    // remove default properties and save it to be added later as a fallback
    let obj = extened_permission_entry.object.as_mut().unwrap();
    let default_properties = std::mem::take(&mut obj.properties);

    let defaut_identifier = default_properties.get(IDENTIFIER).cloned().unwrap();
    let default_identifier = (IDENTIFIER.to_string(), defaut_identifier);

    let mut all_of = vec![];

    let schemas = acl
      .iter()
      .map(|(name, manifest)| {
        manifest
          .global_scope_schema()
          .unwrap_or_else(|e| panic!("invalid JSON schema for plugin {name}: {e}"))
          .map(|s| (s, manifest.gen_possible_permission_schemas(Some(&name))))
      })
      .flatten();

    for ((scope_schema, defs), acl_perm_schema) in schemas {
      let mut perm_schema = SchemaObject::default();
      perm_schema.subschemas().any_of = Some(acl_perm_schema);

      let mut if_schema = SchemaObject::default();
      if_schema.object().properties = [(IDENTIFIER.to_string(), perm_schema.into())].into();

      let mut then_schema = SchemaObject::default();
      then_schema.object().properties = [
        (ALLOW.to_string(), scope_schema.clone()),
        (DENY.to_string(), scope_schema.clone()),
      ]
      .into();

      let mut obj = SchemaObject::default();
      obj.object().properties = [default_identifier.clone()].into();
      obj.subschemas().if_schema = Some(Box::new(if_schema.into()));
      obj.subschemas().then_schema = Some(Box::new(then_schema.into()));

      all_of.push(Schema::Object(obj));
      collected_defs.extend(defs);
    }

    // add back default properties as a fallback
    let mut default_obj = SchemaObject::default();
    default_obj.object().properties = default_properties;
    all_of.push(Schema::Object(default_obj));

    // replace extended PermissionEntry with the new schema
    extened_permission_entry.subschemas().all_of = Some(all_of);
  }

  // extend root schema with definitions collected from plugins
  root_schema.definitions.extend(collected_defs);
}

/// Generate schema for CapabilityFile with all possible plugins permissions
pub fn generate_capability_schema(
  acl: &BTreeMap<String, Manifest>,
  target: Target,
) -> crate::Result<()> {
  let mut schema = schemars::schema_for!(CapabilityFile);

  extend_identifier_schema(&mut schema, acl);
  extend_permission_entry_schema(&mut schema, acl);

  let schema_str = serde_json::to_string_pretty(&schema).unwrap();
  let out_dir = PathBuf::from(CAPABILITIES_SCHEMA_FOLDER_PATH);
  fs::create_dir_all(&out_dir)?;

  let schema_path = out_dir.join(format!("{target}-{CAPABILITIES_SCHEMA_FILE_NAME}"));
  if schema_str != fs::read_to_string(&schema_path).unwrap_or_default() {
    fs::write(&schema_path, schema_str)?;

    fs::copy(
      schema_path,
      out_dir.join(format!(
        "{}-{CAPABILITIES_SCHEMA_FILE_NAME}",
        if target.is_desktop() {
          "desktop"
        } else {
          "mobile"
        }
      )),
    )?;
  }

  Ok(())
}

/// Extend schema with collected permissions from the passed [`PermissionFile`]s.
fn extend_permission_file_schema(schema: &mut RootSchema, permissions: &[PermissionFile]) {
  // collect possible permissions
  let permission_schemas = permissions
    .iter()
    .map(|p| p.gen_possible_permission_schemas(None))
    .flatten()
    .collect();

  if let Some(Schema::Object(obj)) = schema.definitions.get_mut("PermissionSet") {
    let permissions_obj = obj.object().properties.get_mut("permissions");
    if let Some(Schema::Object(permissions_obj)) = permissions_obj {
      // replace the permissions property schema object
      // from a mere string to a referecnce to `PermissionKind`
      permissions_obj.array().items.replace(
        Schema::Object(SchemaObject {
          reference: Some("#/definitions/PermissionKind".into()),
          ..Default::default()
        })
        .into(),
      );

      // add the new `PermissionKind` definition in the schema that
      // is a list of all possible permissions collected
      schema.definitions.insert(
        "PermissionKind".into(),
        Schema::Object(SchemaObject {
          instance_type: Some(InstanceType::String.into()),
          subschemas: Some(Box::new(SubschemaValidation {
            one_of: Some(permission_schemas),
            ..Default::default()
          })),
          ..Default::default()
        }),
      );
    }
  }
}

/// Generate and write a schema based on the format of a [`PermissionFile`].
pub fn generate_permissions_schema<P: AsRef<Path>>(
  permissions: &[PermissionFile],
  out_dir: P,
) -> Result<(), Error> {
  let mut schema = schemars::schema_for!(PermissionFile);

  extend_permission_file_schema(&mut schema, permissions);

  let schema_str = serde_json::to_string_pretty(&schema)?;

  let out_dir = out_dir.as_ref().join(PERMISSION_SCHEMAS_FOLDER_NAME);
  fs::create_dir_all(&out_dir).map_err(Error::CreateDir)?;

  let schema_path = out_dir.join(PERMISSION_SCHEMA_FILE_NAME);
  write_if_changed(&schema_path, schema_str).map_err(Error::WriteFile)?;

  Ok(())
}
