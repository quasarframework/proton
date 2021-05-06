// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Useful items for custom commands.

use crate::hooks::InvokeError;
use crate::{InvokeMessage, Params};
use serde::de::Visitor;
use serde::{Deserialize, Deserializer};

/// Represents a custom command.
pub struct CommandItem<'a, P: Params> {
  /// The name of the command, e.g. `handler` on `#[command] fn handler(value: u64)`
  pub name: &'static str,

  /// The key of the command item, e.g. `value` on `#[command] fn handler(value: u64)`
  pub key: &'static str,

  /// The [`InvokeMessage`] that was passed to this command.
  pub message: &'a InvokeMessage<P>,
}

/// Trait implemented by command arguments to derive a value from a [`CommandItem`].
///
/// # Command Arguments
///
/// A command argument is any type that represents an item parsable from a [`CommandItem`]. Most
/// implementations will use the data stored in [`InvokeMessage`] since [`CommandItem`] is mostly a
/// wrapper around it.
///
/// # Provided Implementations
///
/// Tauri implements [`CommandArg`] automatically for a number of types.
/// * [`tauri::Window`]
/// * [`tauri::State`]
/// * `T where T: serde::Deserialize`
///   * Any type that implements `Deserialize` can automatically be used as a [`CommandArg`].
pub trait CommandArg<'de, P: Params>: Sized {
  /// Derives an instance of `Self` from the [`CommandItem`].
  ///
  /// If the derivation fails, the corresponding message will be rejected using [`InvokeMessage#reject`].
  fn from_command(command: CommandItem<'de, P>) -> Result<Self, InvokeError>;
}

/// Automatically implement [`CommandArg`] for any type that can be deserialized.
impl<'de, D: Deserialize<'de>, P: Params> CommandArg<'de, P> for D {
  fn from_command(command: CommandItem<'de, P>) -> Result<Self, InvokeError> {
    let arg = command.key;
    Self::deserialize(command).map_err(|e| crate::Error::InvalidArgs(arg, e).into())
  }
}

/// Pass the result of [`serde_json::Value::get`] into [`serde_json::Value`]'s deserializer.
///
/// Returns an error if the [`CommandItem`]'s key does not exist in the value.
macro_rules! pass {
  ($fn:ident, $($arg:ident: $argt:ty),+) => {
    fn $fn<V: Visitor<'de>>(self, $($arg: $argt),*) -> Result<V::Value, Self::Error> {
      use serde::de::Error;

      match self.message.payload.get(self.key) {
        Some(value) => value.$fn($($arg),*),
        None => {
          Err(serde_json::Error::custom(format!(
            "command {} missing required key {}",
            self.name, self.key
          )))
        }
      }
    }
  }
}

/// A [`Deserializer`] wrapper around [`CommandItem`].
///
/// If the key doesn't exist, an error will be returned if the deserialized type is not expecting
/// an optional item. If the key does exist, the value will be called with
/// [`Value`](serde_json::Value)'s [`Deserializer`] implementation.
impl<'de, P: Params> Deserializer<'de> for CommandItem<'de, P> {
  type Error = serde_json::Error;

  pass!(deserialize_any, visitor: V);
  pass!(deserialize_bool, visitor: V);
  pass!(deserialize_i8, visitor: V);
  pass!(deserialize_i16, visitor: V);
  pass!(deserialize_i32, visitor: V);
  pass!(deserialize_i64, visitor: V);
  pass!(deserialize_u8, visitor: V);
  pass!(deserialize_u16, visitor: V);
  pass!(deserialize_u32, visitor: V);
  pass!(deserialize_u64, visitor: V);
  pass!(deserialize_f32, visitor: V);
  pass!(deserialize_f64, visitor: V);
  pass!(deserialize_char, visitor: V);
  pass!(deserialize_str, visitor: V);
  pass!(deserialize_string, visitor: V);
  pass!(deserialize_bytes, visitor: V);
  pass!(deserialize_byte_buf, visitor: V);

  fn deserialize_option<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
    match self.message.payload.get(self.key) {
      Some(value) => value.deserialize_option(visitor),
      None => visitor.visit_none(),
    }
  }

  pass!(deserialize_unit, visitor: V);
  pass!(deserialize_unit_struct, name: &'static str, visitor: V);
  pass!(deserialize_newtype_struct, name: &'static str, visitor: V);
  pass!(deserialize_seq, visitor: V);
  pass!(deserialize_tuple, len: usize, visitor: V);

  pass!(
    deserialize_tuple_struct,
    name: &'static str,
    len: usize,
    visitor: V
  );

  pass!(deserialize_map, visitor: V);

  pass!(
    deserialize_struct,
    name: &'static str,
    fields: &'static [&'static str],
    visitor: V
  );

  pass!(
    deserialize_enum,
    name: &'static str,
    fields: &'static [&'static str],
    visitor: V
  );

  pass!(deserialize_identifier, visitor: V);
  pass!(deserialize_ignored_any, visitor: V);
}

/// [Autoref-based stable specialization](https://github.com/dtolnay/case-studies/blob/master/autoref-specialization/README.md)
#[doc(hidden)]
pub mod private {
  use crate::InvokeError;
  use futures::FutureExt;
  use serde::Serialize;
  use std::future::{ready, Future};

  #[doc(hidden)]
  pub struct CommandReturn<T, F>
  where
    T: Serialize,
    F: Future<Output = Result<T, InvokeError>> + Send,
  {
    pub future: F,
  }

  impl<T, F> From<F> for CommandReturn<T, F>
  where
    T: Serialize,
    F: Future<Output = Result<T, InvokeError>> + Send,
  {
    #[inline(always)]
    fn from(future: F) -> Self {
      Self { future }
    }
  }

  pub struct SerializeReturnTag;
  pub trait SerializeReturnKind {
    #[inline(always)]
    fn command_return_kind(&self) -> SerializeReturnTag {
      SerializeReturnTag
    }
  }
  impl<T: Serialize> SerializeReturnKind for &T {}
  impl SerializeReturnTag {
    #[inline(always)]
    pub fn command_return<T: Serialize + Send>(
      self,
      value: T,
    ) -> CommandReturn<T, impl Future<Output = Result<T, InvokeError>>> {
      ready(Ok(value)).into()
    }
  }

  pub struct ResultReturnTag;
  pub trait ResultReturnKind {
    #[inline(always)]
    fn command_return_kind(&self) -> ResultReturnTag {
      ResultReturnTag
    }
  }
  impl<T: Serialize, E: Into<InvokeError>> ResultReturnKind for Result<T, E> {}
  impl ResultReturnTag {
    #[inline(always)]
    pub fn command_return<T: Serialize + Send, E: Into<InvokeError>>(
      self,
      value: Result<T, E>,
    ) -> CommandReturn<T, impl Future<Output = Result<T, InvokeError>>> {
      ready(value.map_err(Into::into)).into()
    }
  }

  pub struct SerializeFutureReturnTag;
  pub trait SerializeFutureReturnKind {
    #[inline(always)]
    fn command_return_kind(&self) -> SerializeFutureReturnTag {
      SerializeFutureReturnTag
    }
  }
  impl<T: Serialize, F: Future<Output = T>> SerializeFutureReturnKind for &F {}
  impl SerializeFutureReturnTag {
    #[inline(always)]
    pub fn command_return<T: Serialize, F: Future<Output = T> + Send>(
      self,
      f: F,
    ) -> CommandReturn<T, impl Future<Output = Result<T, InvokeError>>> {
      f.map(Ok).into()
    }
  }

  pub struct ResultFutureReturnTag;
  pub trait ResultFutureReturnKind {
    #[inline(always)]
    fn command_return_kind(&self) -> ResultFutureReturnTag {
      ResultFutureReturnTag
    }
  }
  impl<T: Serialize, E: Into<InvokeError>, F: Future<Output = Result<T, E>>> ResultFutureReturnKind
    for F
  {
  }
  impl ResultFutureReturnTag {
    #[inline(always)]
    pub fn command_return<
      T: Serialize,
      E: Into<InvokeError>,
      F: Future<Output = Result<T, E>> + Send,
    >(
      self,
      f: F,
    ) -> CommandReturn<T, impl Future<Output = Result<T, InvokeError>>> {
      f.map(move |value| value.map_err(Into::into)).into()
    }
  }
}
