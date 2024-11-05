var __TAURI_IIFE__=function(e){"use strict";function n(e,n,t,i){if("a"===t&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?e!==n||!i:!n.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?i:"a"===t?i.call(e):i?i.value:n.get(e)}function t(e,n,t,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?e!==n||!r:!n.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,t):r?r.value=t:n.set(e,t),t}var i,r,s,a;"function"==typeof SuppressedError&&SuppressedError;const l="__TAURI_TO_IPC_KEY__";function o(e,n=!1){return window.__TAURI_INTERNALS__.transformCallback(e,n)}class u{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,i.set(this,(()=>{})),r.set(this,0),s.set(this,{}),this.id=o((({message:e,id:a})=>{if(a===n(this,r,"f")){t(this,r,a+1,"f"),n(this,i,"f").call(this,e);const l=Object.keys(n(this,s,"f"));if(l.length>0){let e=a+1;for(const t of l.sort()){if(parseInt(t)!==e)break;{const r=n(this,s,"f")[t];delete n(this,s,"f")[t],n(this,i,"f").call(this,r),e+=1}}t(this,r,e,"f")}}else n(this,s,"f")[a.toString()]=e}))}set onmessage(e){t(this,i,e,"f")}get onmessage(){return n(this,i,"f")}[(i=new WeakMap,r=new WeakMap,s=new WeakMap,l)](){return`__CHANNEL__:${this.id}`}toJSON(){return this[l]()}}class c{constructor(e,n,t){this.plugin=e,this.event=n,this.channelId=t}async unregister(){return d(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function d(e,n={},t){return window.__TAURI_INTERNALS__.invoke(e,n,t)}class h{get rid(){return n(this,a,"f")}constructor(e){a.set(this,void 0),t(this,a,e,"f")}async close(){return d("plugin:resources|close",{rid:this.rid})}}a=new WeakMap;var p=Object.freeze({__proto__:null,Channel:u,PluginListener:c,Resource:h,SERIALIZE_TO_IPC_FN:l,addPluginListener:async function(e,n,t){const i=new u;return i.onmessage=t,d(`plugin:${e}|registerListener`,{event:n,handler:i}).then((()=>new c(e,n,i.id)))},checkPermissions:async function(e){return d(`plugin:${e}|check_permissions`)},convertFileSrc:function(e,n="asset"){return window.__TAURI_INTERNALS__.convertFileSrc(e,n)},invoke:d,isTauri:function(){return"isTauri"in window&&!!window.isTauri},requestPermissions:async function(e){return d(`plugin:${e}|request_permissions`)},transformCallback:o});class w extends h{constructor(e){super(e)}static async new(e,n,t){return d("plugin:image|new",{rgba:y(e),width:n,height:t}).then((e=>new w(e)))}static async fromBytes(e){return d("plugin:image|from_bytes",{bytes:y(e)}).then((e=>new w(e)))}static async fromPath(e){return d("plugin:image|from_path",{path:e}).then((e=>new w(e)))}async rgba(){return d("plugin:image|rgba",{rid:this.rid}).then((e=>new Uint8Array(e)))}async size(){return d("plugin:image|size",{rid:this.rid})}}function y(e){return null==e?null:"string"==typeof e?e:e instanceof w?e.rid:e}var _=Object.freeze({__proto__:null,Image:w,transformImage:y});var g=Object.freeze({__proto__:null,defaultWindowIcon:async function(){return d("plugin:app|default_window_icon").then((e=>e?new w(e):null))},getName:async function(){return d("plugin:app|name")},getTauriVersion:async function(){return d("plugin:app|tauri_version")},getVersion:async function(){return d("plugin:app|version")},hide:async function(){return d("plugin:app|app_hide")},setTheme:async function(e){return d("plugin:app|set_app_theme",{theme:e})},show:async function(){return d("plugin:app|app_show")}});class b{constructor(...e){this.type="Logical",1===e.length?"Logical"in e[0]?(this.width=e[0].Logical.width,this.height=e[0].Logical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1])}toPhysical(e){return new m(this.width*e,this.height*e)}[l](){return{width:this.width,height:this.height}}toJSON(){return this[l]()}}class m{constructor(...e){this.type="Physical",1===e.length?"Physical"in e[0]?(this.width=e[0].Physical.width,this.height=e[0].Physical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1])}toLogical(e){return new b(this.width/e,this.height/e)}[l](){return{width:this.width,height:this.height}}toJSON(){return this[l]()}}class v{constructor(e){this.size=e}toLogical(e){return this.size instanceof b?this.size:this.size.toLogical(e)}toPhysical(e){return this.size instanceof m?this.size:this.size.toPhysical(e)}[l](){return{[`${this.size.type}`]:{width:this.size.width,height:this.size.height}}}toJSON(){return this[l]()}}class f{constructor(...e){this.type="Logical",1===e.length?"Logical"in e[0]?(this.x=e[0].Logical.x,this.y=e[0].Logical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1])}toPhysical(e){return new k(this.x*e,this.x*e)}[l](){return{x:this.x,y:this.y}}toJSON(){return this[l]()}}class k{constructor(...e){this.type="Physical",1===e.length?"Physical"in e[0]?(this.x=e[0].Physical.x,this.y=e[0].Physical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1])}toLogical(e){return new f(this.x/e,this.x/e)}[l](){return{x:this.x,y:this.y}}toJSON(){return this[l]()}}class A{constructor(e){this.position=e}toLogical(e){return this.position instanceof f?this.position:this.position.toLogical(e)}toPhysical(e){return this.position instanceof k?this.position:this.position.toPhysical(e)}[l](){return{[`${this.position.type}`]:{x:this.position.x,y:this.position.y}}}toJSON(){return this[l]()}}var E,T=Object.freeze({__proto__:null,LogicalPosition:f,LogicalSize:b,PhysicalPosition:k,PhysicalSize:m,Position:A,Size:v});async function D(e,n){await d("plugin:event|unlisten",{event:e,eventId:n})}async function I(e,n,t){var i;const r="string"==typeof(null==t?void 0:t.target)?{kind:"AnyLabel",label:t.target}:null!==(i=null==t?void 0:t.target)&&void 0!==i?i:{kind:"Any"};return d("plugin:event|listen",{event:e,target:r,handler:o(n)}).then((n=>async()=>D(e,n)))}async function R(e,n,t){return I(e,(t=>{D(e,t.id),n(t)}),t)}async function S(e,n){await d("plugin:event|emit",{event:e,payload:n})}async function L(e,n,t){const i="string"==typeof e?{kind:"AnyLabel",label:e}:e;await d("plugin:event|emit_to",{target:i,event:n,payload:t})}!function(e){e.WINDOW_RESIZED="tauri://resize",e.WINDOW_MOVED="tauri://move",e.WINDOW_CLOSE_REQUESTED="tauri://close-requested",e.WINDOW_DESTROYED="tauri://destroyed",e.WINDOW_FOCUS="tauri://focus",e.WINDOW_BLUR="tauri://blur",e.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",e.WINDOW_THEME_CHANGED="tauri://theme-changed",e.WINDOW_CREATED="tauri://window-created",e.WEBVIEW_CREATED="tauri://webview-created",e.DRAG_ENTER="tauri://drag-enter",e.DRAG_OVER="tauri://drag-over",e.DRAG_DROP="tauri://drag-drop",e.DRAG_LEAVE="tauri://drag-leave"}(E||(E={}));var x,N,C,P=Object.freeze({__proto__:null,get TauriEvent(){return E},emit:S,emitTo:L,listen:I,once:R});function z(e){var n;if("items"in e)e.items=null===(n=e.items)||void 0===n?void 0:n.map((e=>"rid"in e?e:z(e)));else if("action"in e&&e.action){const n=new u;return n.onmessage=e.action,delete e.action,{...e,handler:n}}return e}async function W(e,n){const t=new u;if(n&&"object"==typeof n&&("action"in n&&n.action&&(t.onmessage=n.action,delete n.action),"items"in n&&n.items)){function i(e){var n;return"rid"in e?[e.rid,e.kind]:("item"in e&&"object"==typeof e.item&&(null===(n=e.item.About)||void 0===n?void 0:n.icon)&&(e.item.About.icon=y(e.item.About.icon)),"icon"in e&&e.icon&&(e.icon=y(e.icon)),"items"in e&&e.items&&(e.items=e.items.map(i)),z(e))}n.items=n.items.map(i)}return d("plugin:menu|new",{kind:e,options:n,handler:t})}class O extends h{get id(){return n(this,x,"f")}get kind(){return n(this,N,"f")}constructor(e,n,i){super(e),x.set(this,void 0),N.set(this,void 0),t(this,x,n,"f"),t(this,N,i,"f")}}x=new WeakMap,N=new WeakMap;class F extends O{constructor(e,n){super(e,n,"MenuItem")}static async new(e){return W("MenuItem",e).then((([e,n])=>new F(e,n)))}async text(){return d("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return d("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return d("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return d("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return d("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}}class M extends O{constructor(e,n){super(e,n,"Check")}static async new(e){return W("Check",e).then((([e,n])=>new M(e,n)))}async text(){return d("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return d("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return d("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return d("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return d("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}async isChecked(){return d("plugin:menu|is_checked",{rid:this.rid})}async setChecked(e){return d("plugin:menu|set_checked",{rid:this.rid,checked:e})}}!function(e){e.Add="Add",e.Advanced="Advanced",e.Bluetooth="Bluetooth",e.Bookmarks="Bookmarks",e.Caution="Caution",e.ColorPanel="ColorPanel",e.ColumnView="ColumnView",e.Computer="Computer",e.EnterFullScreen="EnterFullScreen",e.Everyone="Everyone",e.ExitFullScreen="ExitFullScreen",e.FlowView="FlowView",e.Folder="Folder",e.FolderBurnable="FolderBurnable",e.FolderSmart="FolderSmart",e.FollowLinkFreestanding="FollowLinkFreestanding",e.FontPanel="FontPanel",e.GoLeft="GoLeft",e.GoRight="GoRight",e.Home="Home",e.IChatTheater="IChatTheater",e.IconView="IconView",e.Info="Info",e.InvalidDataFreestanding="InvalidDataFreestanding",e.LeftFacingTriangle="LeftFacingTriangle",e.ListView="ListView",e.LockLocked="LockLocked",e.LockUnlocked="LockUnlocked",e.MenuMixedState="MenuMixedState",e.MenuOnState="MenuOnState",e.MobileMe="MobileMe",e.MultipleDocuments="MultipleDocuments",e.Network="Network",e.Path="Path",e.PreferencesGeneral="PreferencesGeneral",e.QuickLook="QuickLook",e.RefreshFreestanding="RefreshFreestanding",e.Refresh="Refresh",e.Remove="Remove",e.RevealFreestanding="RevealFreestanding",e.RightFacingTriangle="RightFacingTriangle",e.Share="Share",e.Slideshow="Slideshow",e.SmartBadge="SmartBadge",e.StatusAvailable="StatusAvailable",e.StatusNone="StatusNone",e.StatusPartiallyAvailable="StatusPartiallyAvailable",e.StatusUnavailable="StatusUnavailable",e.StopProgressFreestanding="StopProgressFreestanding",e.StopProgress="StopProgress",e.TrashEmpty="TrashEmpty",e.TrashFull="TrashFull",e.User="User",e.UserAccounts="UserAccounts",e.UserGroup="UserGroup",e.UserGuest="UserGuest"}(C||(C={}));class U extends O{constructor(e,n){super(e,n,"Icon")}static async new(e){return W("Icon",e).then((([e,n])=>new U(e,n)))}async text(){return d("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return d("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return d("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return d("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return d("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}async setIcon(e){return d("plugin:menu|set_icon",{rid:this.rid,icon:y(e)})}}class B extends O{constructor(e,n){super(e,n,"Predefined")}static async new(e){return W("Predefined",e).then((([e,n])=>new B(e,n)))}async text(){return d("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return d("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}}function j([e,n,t]){switch(t){case"Submenu":return new V(e,n);case"Predefined":return new B(e,n);case"Check":return new M(e,n);case"Icon":return new U(e,n);default:return new F(e,n)}}class V extends O{constructor(e,n){super(e,n,"Submenu")}static async new(e){return W("Submenu",e).then((([e,n])=>new V(e,n)))}async text(){return d("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return d("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return d("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return d("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async append(e){return d("plugin:menu|append",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async prepend(e){return d("plugin:menu|prepend",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async insert(e,n){return d("plugin:menu|insert",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e)),position:n})}async remove(e){return d("plugin:menu|remove",{rid:this.rid,kind:this.kind,item:[e.rid,e.kind]})}async removeAt(e){return d("plugin:menu|remove_at",{rid:this.rid,kind:this.kind,position:e}).then(j)}async items(){return d("plugin:menu|items",{rid:this.rid,kind:this.kind}).then((e=>e.map(j)))}async get(e){return d("plugin:menu|get",{rid:this.rid,kind:this.kind,id:e}).then((e=>e?j(e):null))}async popup(e,n){var t;return d("plugin:menu|popup",{rid:this.rid,kind:this.kind,window:null!==(t=null==n?void 0:n.label)&&void 0!==t?t:null,at:e instanceof A?e:e?new A(e):null})}async setAsWindowsMenuForNSApp(){return d("plugin:menu|set_as_windows_menu_for_nsapp",{rid:this.rid})}async setAsHelpMenuForNSApp(){return d("plugin:menu|set_as_help_menu_for_nsapp",{rid:this.rid})}}function G([e,n,t]){switch(t){case"Submenu":return new V(e,n);case"Predefined":return new B(e,n);case"Check":return new M(e,n);case"Icon":return new U(e,n);default:return new F(e,n)}}class H extends O{constructor(e,n){super(e,n,"Menu")}static async new(e){return W("Menu",e).then((([e,n])=>new H(e,n)))}static async default(){return d("plugin:menu|create_default").then((([e,n])=>new H(e,n)))}async append(e){return d("plugin:menu|append",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async prepend(e){return d("plugin:menu|prepend",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async insert(e,n){return d("plugin:menu|insert",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e)),position:n})}async remove(e){return d("plugin:menu|remove",{rid:this.rid,kind:this.kind,item:[e.rid,e.kind]})}async removeAt(e){return d("plugin:menu|remove_at",{rid:this.rid,kind:this.kind,position:e}).then(G)}async items(){return d("plugin:menu|items",{rid:this.rid,kind:this.kind}).then((e=>e.map(G)))}async get(e){return d("plugin:menu|get",{rid:this.rid,kind:this.kind,id:e}).then((e=>e?G(e):null))}async popup(e,n){var t;return d("plugin:menu|popup",{rid:this.rid,kind:this.kind,window:null!==(t=null==n?void 0:n.label)&&void 0!==t?t:null,at:e instanceof A?e:e?new A(e):null})}async setAsAppMenu(){return d("plugin:menu|set_as_app_menu",{rid:this.rid}).then((e=>e?new H(e[0],e[1]):null))}async setAsWindowMenu(e){var n;return d("plugin:menu|set_as_window_menu",{rid:this.rid,window:null!==(n=null==e?void 0:e.label)&&void 0!==n?n:null}).then((e=>e?new H(e[0],e[1]):null))}}var $=Object.freeze({__proto__:null,CheckMenuItem:M,IconMenuItem:U,Menu:H,MenuItem:F,get NativeIcon(){return C},PredefinedMenuItem:B,Submenu:V});function q(){var e;window.__TAURI_INTERNALS__=null!==(e=window.__TAURI_INTERNALS__)&&void 0!==e?e:{}}var J,Q=Object.freeze({__proto__:null,clearMocks:function(){var e,n,t;"object"==typeof window.__TAURI_INTERNALS__&&((null===(e=window.__TAURI_INTERNALS__)||void 0===e?void 0:e.convertFileSrc)&&delete window.__TAURI_INTERNALS__.convertFileSrc,(null===(n=window.__TAURI_INTERNALS__)||void 0===n?void 0:n.invoke)&&delete window.__TAURI_INTERNALS__.invoke,(null===(t=window.__TAURI_INTERNALS__)||void 0===t?void 0:t.metadata)&&delete window.__TAURI_INTERNALS__.metadata)},mockConvertFileSrc:function(e){q(),window.__TAURI_INTERNALS__.convertFileSrc=function(n,t="asset"){const i=encodeURIComponent(n);return"windows"===e?`http://${t}.localhost/${i}`:`${t}://localhost/${i}`}},mockIPC:function(e){q(),window.__TAURI_INTERNALS__.transformCallback=function(e,n=!1){const t=window.crypto.getRandomValues(new Uint32Array(1))[0],i=`_${t}`;return Object.defineProperty(window,i,{value:t=>(n&&Reflect.deleteProperty(window,i),e&&e(t)),writable:!1,configurable:!0}),t},window.__TAURI_INTERNALS__.invoke=function(n,t,i){return e(n,t)}},mockWindows:function(e,...n){q(),window.__TAURI_INTERNALS__.metadata={currentWindow:{label:e},currentWebview:{windowLabel:e,label:e}}}});!function(e){e[e.Audio=1]="Audio",e[e.Cache=2]="Cache",e[e.Config=3]="Config",e[e.Data=4]="Data",e[e.LocalData=5]="LocalData",e[e.Document=6]="Document",e[e.Download=7]="Download",e[e.Picture=8]="Picture",e[e.Public=9]="Public",e[e.Video=10]="Video",e[e.Resource=11]="Resource",e[e.Temp=12]="Temp",e[e.AppConfig=13]="AppConfig",e[e.AppData=14]="AppData",e[e.AppLocalData=15]="AppLocalData",e[e.AppCache=16]="AppCache",e[e.AppLog=17]="AppLog",e[e.Desktop=18]="Desktop",e[e.Executable=19]="Executable",e[e.Font=20]="Font",e[e.Home=21]="Home",e[e.Runtime=22]="Runtime",e[e.Template=23]="Template"}(J||(J={}));var Z=Object.freeze({__proto__:null,get BaseDirectory(){return J},appCacheDir:async function(){return d("plugin:path|resolve_directory",{directory:J.AppCache})},appConfigDir:async function(){return d("plugin:path|resolve_directory",{directory:J.AppConfig})},appDataDir:async function(){return d("plugin:path|resolve_directory",{directory:J.AppData})},appLocalDataDir:async function(){return d("plugin:path|resolve_directory",{directory:J.AppLocalData})},appLogDir:async function(){return d("plugin:path|resolve_directory",{directory:J.AppLog})},audioDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Audio})},basename:async function(e,n){return d("plugin:path|basename",{path:e,ext:n})},cacheDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Cache})},configDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Config})},dataDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Data})},delimiter:function(){return window.__TAURI_INTERNALS__.plugins.path.delimiter},desktopDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Desktop})},dirname:async function(e){return d("plugin:path|dirname",{path:e})},documentDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Document})},downloadDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Download})},executableDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Executable})},extname:async function(e){return d("plugin:path|extname",{path:e})},fontDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Font})},homeDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Home})},isAbsolute:async function(e){return d("plugin:path|isAbsolute",{path:e})},join:async function(...e){return d("plugin:path|join",{paths:e})},localDataDir:async function(){return d("plugin:path|resolve_directory",{directory:J.LocalData})},normalize:async function(e){return d("plugin:path|normalize",{path:e})},pictureDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Picture})},publicDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Public})},resolve:async function(...e){return d("plugin:path|resolve",{paths:e})},resolveResource:async function(e){return d("plugin:path|resolve_directory",{directory:J.Resource,path:e})},resourceDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Resource})},runtimeDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Runtime})},sep:function(){return window.__TAURI_INTERNALS__.plugins.path.sep},tempDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Temp})},templateDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Template})},videoDir:async function(){return d("plugin:path|resolve_directory",{directory:J.Video})}});class K extends h{constructor(e,n){super(e),this.id=n}static async getById(e){return d("plugin:tray|get_by_id",{id:e}).then((n=>n?new K(n,e):null))}static async removeById(e){return d("plugin:tray|remove_by_id",{id:e})}static async new(e){(null==e?void 0:e.menu)&&(e.menu=[e.menu.rid,e.menu.kind]),(null==e?void 0:e.icon)&&(e.icon=y(e.icon));const n=new u;if(null==e?void 0:e.action){const t=e.action;n.onmessage=e=>t(function(e){const n=e;return n.position=new k(e.position),n.rect.position=new k(e.rect.position),n.rect.size=new m(e.rect.size),n}(e)),delete e.action}return d("plugin:tray|new",{options:null!=e?e:{},handler:n}).then((([e,n])=>new K(e,n)))}async setIcon(e){let n=null;return e&&(n=y(e)),d("plugin:tray|set_icon",{rid:this.rid,icon:n})}async setMenu(e){return e&&(e=[e.rid,e.kind]),d("plugin:tray|set_menu",{rid:this.rid,menu:e})}async setTooltip(e){return d("plugin:tray|set_tooltip",{rid:this.rid,tooltip:e})}async setTitle(e){return d("plugin:tray|set_title",{rid:this.rid,title:e})}async setVisible(e){return d("plugin:tray|set_visible",{rid:this.rid,visible:e})}async setTempDirPath(e){return d("plugin:tray|set_temp_dir_path",{rid:this.rid,path:e})}async setIconAsTemplate(e){return d("plugin:tray|set_icon_as_template",{rid:this.rid,asTemplate:e})}async setMenuOnLeftClick(e){return d("plugin:tray|set_show_menu_on_left_click",{rid:this.rid,onLeft:e})}}var Y,X,ee=Object.freeze({__proto__:null,TrayIcon:K});!function(e){e[e.Critical=1]="Critical",e[e.Informational=2]="Informational"}(Y||(Y={}));class ne{constructor(e){this._preventDefault=!1,this.event=e.event,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}}function te(){return new se(window.__TAURI_INTERNALS__.metadata.currentWindow.label,{skip:!0})}async function ie(){return d("plugin:window|get_all_windows").then((e=>e.map((e=>new se(e,{skip:!0})))))}!function(e){e.None="none",e.Normal="normal",e.Indeterminate="indeterminate",e.Paused="paused",e.Error="error"}(X||(X={}));const re=["tauri://created","tauri://error"];class se{constructor(e,n={}){var t;this.label=e,this.listeners=Object.create(null),(null==n?void 0:n.skip)||d("plugin:window|create",{options:{...n,parent:"string"==typeof n.parent?n.parent:null===(t=n.parent)||void 0===t?void 0:t.label,label:e}}).then((async()=>this.emit("tauri://created"))).catch((async e=>this.emit("tauri://error",e)))}static async getByLabel(e){var n;return null!==(n=(await ie()).find((n=>n.label===e)))&&void 0!==n?n:null}static getCurrent(){return te()}static async getAll(){return ie()}static async getFocusedWindow(){for(const e of await ie())if(await e.isFocused())return e;return null}async listen(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:I(e,n,{target:{kind:"Window",label:this.label}})}async once(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:R(e,n,{target:{kind:"Window",label:this.label}})}async emit(e,n){if(!re.includes(e))return S(e,n);for(const t of this.listeners[e]||[])t({event:e,id:-1,payload:n})}async emitTo(e,n,t){if(!re.includes(n))return L(e,n,t);for(const e of this.listeners[n]||[])e({event:n,id:-1,payload:t})}_handleTauriEvent(e,n){return!!re.includes(e)&&(e in this.listeners?this.listeners[e].push(n):this.listeners[e]=[n],!0)}async scaleFactor(){return d("plugin:window|scale_factor",{label:this.label})}async innerPosition(){return d("plugin:window|inner_position",{label:this.label}).then((e=>new k(e)))}async outerPosition(){return d("plugin:window|outer_position",{label:this.label}).then((e=>new k(e)))}async innerSize(){return d("plugin:window|inner_size",{label:this.label}).then((e=>new m(e)))}async outerSize(){return d("plugin:window|outer_size",{label:this.label}).then((e=>new m(e)))}async isFullscreen(){return d("plugin:window|is_fullscreen",{label:this.label})}async isMinimized(){return d("plugin:window|is_minimized",{label:this.label})}async isMaximized(){return d("plugin:window|is_maximized",{label:this.label})}async isFocused(){return d("plugin:window|is_focused",{label:this.label})}async isDecorated(){return d("plugin:window|is_decorated",{label:this.label})}async isResizable(){return d("plugin:window|is_resizable",{label:this.label})}async isMaximizable(){return d("plugin:window|is_maximizable",{label:this.label})}async isMinimizable(){return d("plugin:window|is_minimizable",{label:this.label})}async isClosable(){return d("plugin:window|is_closable",{label:this.label})}async isVisible(){return d("plugin:window|is_visible",{label:this.label})}async title(){return d("plugin:window|title",{label:this.label})}async theme(){return d("plugin:window|theme",{label:this.label})}async center(){return d("plugin:window|center",{label:this.label})}async requestUserAttention(e){let n=null;return e&&(n=e===Y.Critical?{type:"Critical"}:{type:"Informational"}),d("plugin:window|request_user_attention",{label:this.label,value:n})}async setResizable(e){return d("plugin:window|set_resizable",{label:this.label,value:e})}async setEnabled(e){return d("plugin:window|set_enabled",{label:this.label,value:e})}async isEnabled(){return d("plugin:window|is_enabled",{label:this.label})}async setMaximizable(e){return d("plugin:window|set_maximizable",{label:this.label,value:e})}async setMinimizable(e){return d("plugin:window|set_minimizable",{label:this.label,value:e})}async setClosable(e){return d("plugin:window|set_closable",{label:this.label,value:e})}async setTitle(e){return d("plugin:window|set_title",{label:this.label,value:e})}async maximize(){return d("plugin:window|maximize",{label:this.label})}async unmaximize(){return d("plugin:window|unmaximize",{label:this.label})}async toggleMaximize(){return d("plugin:window|toggle_maximize",{label:this.label})}async minimize(){return d("plugin:window|minimize",{label:this.label})}async unminimize(){return d("plugin:window|unminimize",{label:this.label})}async show(){return d("plugin:window|show",{label:this.label})}async hide(){return d("plugin:window|hide",{label:this.label})}async close(){return d("plugin:window|close",{label:this.label})}async destroy(){return d("plugin:window|destroy",{label:this.label})}async setDecorations(e){return d("plugin:window|set_decorations",{label:this.label,value:e})}async setShadow(e){return d("plugin:window|set_shadow",{label:this.label,value:e})}async setEffects(e){return d("plugin:window|set_effects",{label:this.label,value:e})}async clearEffects(){return d("plugin:window|set_effects",{label:this.label,value:null})}async setAlwaysOnTop(e){return d("plugin:window|set_always_on_top",{label:this.label,value:e})}async setAlwaysOnBottom(e){return d("plugin:window|set_always_on_bottom",{label:this.label,value:e})}async setContentProtected(e){return d("plugin:window|set_content_protected",{label:this.label,value:e})}async setSize(e){return d("plugin:window|set_size",{label:this.label,value:e instanceof v?e:new v(e)})}async setMinSize(e){return d("plugin:window|set_min_size",{label:this.label,value:e instanceof v?e:e?new v(e):null})}async setMaxSize(e){return d("plugin:window|set_max_size",{label:this.label,value:e instanceof v?e:e?new v(e):null})}async setSizeConstraints(e){function n(e){return e?{Logical:e}:null}return d("plugin:window|set_size_constraints",{label:this.label,value:{minWidth:n(null==e?void 0:e.minWidth),minHeight:n(null==e?void 0:e.minHeight),maxWidth:n(null==e?void 0:e.maxWidth),maxHeight:n(null==e?void 0:e.maxHeight)}})}async setPosition(e){return d("plugin:window|set_position",{label:this.label,value:e instanceof A?e:new A(e)})}async setFullscreen(e){return d("plugin:window|set_fullscreen",{label:this.label,value:e})}async setFocus(){return d("plugin:window|set_focus",{label:this.label})}async setIcon(e){return d("plugin:window|set_icon",{label:this.label,value:y(e)})}async setSkipTaskbar(e){return d("plugin:window|set_skip_taskbar",{label:this.label,value:e})}async setCursorGrab(e){return d("plugin:window|set_cursor_grab",{label:this.label,value:e})}async setCursorVisible(e){return d("plugin:window|set_cursor_visible",{label:this.label,value:e})}async setCursorIcon(e){return d("plugin:window|set_cursor_icon",{label:this.label,value:e})}async setCursorPosition(e){return d("plugin:window|set_cursor_position",{label:this.label,value:e instanceof A?e:new A(e)})}async setIgnoreCursorEvents(e){return d("plugin:window|set_ignore_cursor_events",{label:this.label,value:e})}async startDragging(){return d("plugin:window|start_dragging",{label:this.label})}async startResizeDragging(e){return d("plugin:window|start_resize_dragging",{label:this.label,value:e})}async setProgressBar(e){return d("plugin:window|set_progress_bar",{label:this.label,value:e})}async setVisibleOnAllWorkspaces(e){return d("plugin:window|set_visible_on_all_workspaces",{label:this.label,value:e})}async setTitleBarStyle(e){return d("plugin:window|set_title_bar_style",{label:this.label,value:e})}async setTheme(e){return d("plugin:window|set_theme",{label:this.label,value:e})}async onResized(e){return this.listen(E.WINDOW_RESIZED,(n=>{n.payload=new m(n.payload),e(n)}))}async onMoved(e){return this.listen(E.WINDOW_MOVED,(n=>{n.payload=new k(n.payload),e(n)}))}async onCloseRequested(e){return this.listen(E.WINDOW_CLOSE_REQUESTED,(async n=>{const t=new ne(n);await e(t),t.isPreventDefault()||await this.destroy()}))}async onDragDropEvent(e){const n=await this.listen(E.DRAG_ENTER,(n=>{e({...n,payload:{type:"enter",paths:n.payload.paths,position:new k(n.payload.position)}})})),t=await this.listen(E.DRAG_OVER,(n=>{e({...n,payload:{type:"over",position:new k(n.payload.position)}})})),i=await this.listen(E.DRAG_DROP,(n=>{e({...n,payload:{type:"drop",paths:n.payload.paths,position:new k(n.payload.position)}})})),r=await this.listen(E.DRAG_LEAVE,(n=>{e({...n,payload:{type:"leave"}})}));return()=>{n(),i(),t(),r()}}async onFocusChanged(e){const n=await this.listen(E.WINDOW_FOCUS,(n=>{e({...n,payload:!0})})),t=await this.listen(E.WINDOW_BLUR,(n=>{e({...n,payload:!1})}));return()=>{n(),t()}}async onScaleChanged(e){return this.listen(E.WINDOW_SCALE_FACTOR_CHANGED,e)}async onThemeChanged(e){return this.listen(E.WINDOW_THEME_CHANGED,e)}}var ae,le;function oe(e){return null===e?null:{name:e.name,scaleFactor:e.scaleFactor,position:new k(e.position),size:new m(e.size)}}!function(e){e.AppearanceBased="appearanceBased",e.Light="light",e.Dark="dark",e.MediumLight="mediumLight",e.UltraDark="ultraDark",e.Titlebar="titlebar",e.Selection="selection",e.Menu="menu",e.Popover="popover",e.Sidebar="sidebar",e.HeaderView="headerView",e.Sheet="sheet",e.WindowBackground="windowBackground",e.HudWindow="hudWindow",e.FullScreenUI="fullScreenUI",e.Tooltip="tooltip",e.ContentBackground="contentBackground",e.UnderWindowBackground="underWindowBackground",e.UnderPageBackground="underPageBackground",e.Mica="mica",e.Blur="blur",e.Acrylic="acrylic",e.Tabbed="tabbed",e.TabbedDark="tabbedDark",e.TabbedLight="tabbedLight"}(ae||(ae={})),function(e){e.FollowsWindowActiveState="followsWindowActiveState",e.Active="active",e.Inactive="inactive"}(le||(le={}));var ue=Object.freeze({__proto__:null,CloseRequestedEvent:ne,get Effect(){return ae},get EffectState(){return le},LogicalPosition:f,LogicalSize:b,PhysicalPosition:k,PhysicalSize:m,get ProgressBarStatus(){return X},get UserAttentionType(){return Y},Window:se,availableMonitors:async function(){return d("plugin:window|available_monitors").then((e=>e.map(oe)))},currentMonitor:async function(){return d("plugin:window|current_monitor").then(oe)},cursorPosition:async function(){return d("plugin:window|cursor_position").then((e=>new k(e)))},getAllWindows:ie,getCurrentWindow:te,monitorFromPoint:async function(e,n){return d("plugin:window|monitor_from_point",{x:e,y:n}).then(oe)},primaryMonitor:async function(){return d("plugin:window|primary_monitor").then(oe)}});function ce(){return new pe(te(),window.__TAURI_INTERNALS__.metadata.currentWebview.label,{skip:!0})}async function de(){return d("plugin:webview|get_all_webviews").then((e=>e.map((e=>new pe(new se(e.windowLabel,{skip:!0}),e.label,{skip:!0})))))}const he=["tauri://created","tauri://error"];class pe{constructor(e,n,t){this.window=e,this.label=n,this.listeners=Object.create(null),(null==t?void 0:t.skip)||d("plugin:webview|create_webview",{windowLabel:e.label,label:n,options:t}).then((async()=>this.emit("tauri://created"))).catch((async e=>this.emit("tauri://error",e)))}static async getByLabel(e){var n;return null!==(n=(await de()).find((n=>n.label===e)))&&void 0!==n?n:null}static getCurrent(){return ce()}static async getAll(){return de()}async listen(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:I(e,n,{target:{kind:"Webview",label:this.label}})}async once(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:R(e,n,{target:{kind:"Webview",label:this.label}})}async emit(e,n){if(!he.includes(e))return S(e,n);for(const t of this.listeners[e]||[])t({event:e,id:-1,payload:n})}async emitTo(e,n,t){if(!he.includes(n))return L(e,n,t);for(const e of this.listeners[n]||[])e({event:n,id:-1,payload:t})}_handleTauriEvent(e,n){return!!he.includes(e)&&(e in this.listeners?this.listeners[e].push(n):this.listeners[e]=[n],!0)}async position(){return d("plugin:webview|webview_position",{label:this.label}).then((e=>new k(e)))}async size(){return d("plugin:webview|webview_size",{label:this.label}).then((e=>new m(e)))}async close(){return d("plugin:webview|close",{label:this.label})}async setSize(e){return d("plugin:webview|set_webview_size",{label:this.label,value:e instanceof v?e:new v(e)})}async setPosition(e){return d("plugin:webview|set_webview_position",{label:this.label,value:e instanceof A?e:new A(e)})}async setFocus(){return d("plugin:webview|set_webview_focus",{label:this.label})}async hide(){return d("plugin:webview|webview_hide",{label:this.label})}async show(){return d("plugin:webview|webview_show",{label:this.label})}async setZoom(e){return d("plugin:webview|set_webview_zoom",{label:this.label,value:e})}async reparent(e){return d("plugin:webview|reparent",{label:this.label,window:"string"==typeof e?e:e.label})}async clearAllBrowsingData(){return d("plugin:webview|clear_all_browsing_data")}async onDragDropEvent(e){const n=await this.listen(E.DRAG_ENTER,(n=>{e({...n,payload:{type:"enter",paths:n.payload.paths,position:new k(n.payload.position)}})})),t=await this.listen(E.DRAG_OVER,(n=>{e({...n,payload:{type:"over",position:new k(n.payload.position)}})})),i=await this.listen(E.DRAG_DROP,(n=>{e({...n,payload:{type:"drop",paths:n.payload.paths,position:new k(n.payload.position)}})})),r=await this.listen(E.DRAG_LEAVE,(n=>{e({...n,payload:{type:"leave"}})}));return()=>{n(),i(),t(),r()}}}var we,ye,_e=Object.freeze({__proto__:null,Webview:pe,getAllWebviews:de,getCurrentWebview:ce});function ge(){const e=ce();return new me(e.label,{skip:!0})}async function be(){return d("plugin:window|get_all_windows").then((e=>e.map((e=>new me(e,{skip:!0})))))}class me{constructor(e,n={}){var t;this.label=e,this.listeners=Object.create(null),(null==n?void 0:n.skip)||d("plugin:webview|create_webview_window",{options:{...n,parent:"string"==typeof n.parent?n.parent:null===(t=n.parent)||void 0===t?void 0:t.label,label:e}}).then((async()=>this.emit("tauri://created"))).catch((async e=>this.emit("tauri://error",e)))}static async getByLabel(e){var n;const t=null!==(n=(await be()).find((n=>n.label===e)))&&void 0!==n?n:null;return t?new me(t.label,{skip:!0}):null}static getCurrent(){return ge()}static async getAll(){return be()}async listen(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:I(e,n,{target:{kind:"WebviewWindow",label:this.label}})}async once(e,n){return this._handleTauriEvent(e,n)?()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)}:R(e,n,{target:{kind:"WebviewWindow",label:this.label}})}}we=me,ye=[se,pe],(Array.isArray(ye)?ye:[ye]).forEach((e=>{Object.getOwnPropertyNames(e.prototype).forEach((n=>{var t;"object"==typeof we.prototype&&we.prototype&&n in we.prototype||Object.defineProperty(we.prototype,n,null!==(t=Object.getOwnPropertyDescriptor(e.prototype,n))&&void 0!==t?t:Object.create(null))}))}));var ve=Object.freeze({__proto__:null,WebviewWindow:me,getAllWebviewWindows:be,getCurrentWebviewWindow:ge});return e.app=g,e.core=p,e.dpi=T,e.event=P,e.image=_,e.menu=$,e.mocks=Q,e.path=Z,e.tray=ee,e.webview=_e,e.webviewWindow=ve,e.window=ue,e}({});window.__TAURI__=__TAURI_IIFE__;
