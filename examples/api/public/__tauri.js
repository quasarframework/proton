function _inherits(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&_setPrototypeOf(e,r)}function _setPrototypeOf(e,r){return(_setPrototypeOf=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function _createSuper(e){var r=_isNativeReflectConstruct();return function(){var t,n=_getPrototypeOf(e);if(r){var o=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,r){return!r||"object"!==_typeof(r)&&"function"!=typeof r?_assertThisInitialized(e):r}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _createForOfIteratorHelper(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return u=e.done,e},e:function(e){i=!0,a=e},f:function(){try{u||null==t.return||t.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}function asyncGeneratorStep(e,r,t,n,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void t(e)}i.done?r(c):Promise.resolve(c).then(n,o)}function _asyncToGenerator(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function u(e){asyncGeneratorStep(a,n,o,u,i,"next",e)}function i(e){asyncGeneratorStep(a,n,o,u,i,"throw",e)}u(void 0)}))}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e,r){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).__TAURI__={})}(this,(function(e){"use strict";var r=function(e){var r,t=Object.prototype,n=t.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",i=o.toStringTag||"@@toStringTag";function c(e,r,t){return Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}),e[r]}try{c({},"")}catch(e){c=function(e,r,t){return e[r]=t}}function s(e,r,t,n){var o=r&&r.prototype instanceof y?r:y,a=Object.create(o.prototype),u=new O(n||[]);return a._invoke=function(e,r,t){var n=f;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw a;return j()}for(t.method=o,t.arg=a;;){var u=t.delegate;if(u){var i=T(u,t);if(i){if(i===d)continue;return i}}if("next"===t.method)t.sent=t._sent=t.arg;else if("throw"===t.method){if(n===f)throw n=m,t.arg;t.dispatchException(t.arg)}else"return"===t.method&&t.abrupt("return",t.arg);n=h;var c=p(e,r,t);if("normal"===c.type){if(n=t.done?m:l,c.arg===d)continue;return{value:c.arg,done:t.done}}"throw"===c.type&&(n=m,t.method="throw",t.arg=c.arg)}}}(e,t,u),a}function p(e,r,t){try{return{type:"normal",arg:e.call(r,t)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var f="suspendedStart",l="suspendedYield",h="executing",m="completed",d={};function y(){}function _(){}function g(){}var v={};v[a]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(M([])));b&&b!==t&&n.call(b,a)&&(v=b);var R=g.prototype=y.prototype=Object.create(v);function k(e){["next","throw","return"].forEach((function(r){c(e,r,(function(e){return this._invoke(r,e)}))}))}function x(e,r){function t(o,a,u,i){var c=p(e[o],e,a);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"===_typeof(f)&&n.call(f,"__await")?r.resolve(f.__await).then((function(e){t("next",e,u,i)}),(function(e){t("throw",e,u,i)})):r.resolve(f).then((function(e){s.value=e,u(s)}),(function(e){return t("throw",e,u,i)}))}i(c.arg)}var o;this._invoke=function(e,n){function a(){return new r((function(r,o){t(e,n,r,o)}))}return o=o?o.then(a,a):a()}}function T(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,T(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=p(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,d):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function G(e){var r={tryLoc:e[0]};1 in e&&(r.catchLoc=e[1]),2 in e&&(r.finallyLoc=e[2],r.afterLoc=e[3]),this.tryEntries.push(r)}function P(e){var r=e.completion||{};r.type="normal",delete r.arg,e.completion=r}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(G,this),this.reset(!0)}function M(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,u=function t(){for(;++o<e.length;)if(n.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=r,t.done=!0,t};return u.next=u}}return{next:j}}function j(){return{value:r,done:!0}}return _.prototype=R.constructor=g,g.constructor=_,_.displayName=c(g,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var r="function"==typeof e&&e.constructor;return!!r&&(r===_||"GeneratorFunction"===(r.displayName||r.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,c(e,i,"GeneratorFunction")),e.prototype=Object.create(R),e},e.awrap=function(e){return{__await:e}},k(x.prototype),x.prototype[u]=function(){return this},e.AsyncIterator=x,e.async=function(r,t,n,o,a){void 0===a&&(a=Promise);var u=new x(s(r,t,n,o),a);return e.isGeneratorFunction(t)?u:u.next().then((function(e){return e.done?e.value:u.next()}))},k(R),c(R,i,"Generator"),R[a]=function(){return this},R.toString=function(){return"[object Generator]"},e.keys=function(e){var r=[];for(var t in e)r.push(t);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=M,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(P),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function o(n,o){return i.type="throw",i.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var u=this.tryEntries[a],i=u.completion;if("root"===u.tryLoc)return o("end");if(u.tryLoc<=this.prev){var c=n.call(u,"catchLoc"),s=n.call(u,"finallyLoc");if(c&&s){if(this.prev<u.catchLoc)return o(u.catchLoc,!0);if(this.prev<u.finallyLoc)return o(u.finallyLoc)}else if(c){if(this.prev<u.catchLoc)return o(u.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return o(u.finallyLoc)}}}},abrupt:function(e,r){for(var t=this.tryEntries.length-1;t>=0;--t){var o=this.tryEntries[t];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var u=a?a.completion:{};return u.type=e,u.arg=r,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(u)},complete:function(e,r){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&r&&(this.next=r),d},finish:function(e){for(var r=this.tryEntries.length-1;r>=0;--r){var t=this.tryEntries[r];if(t.finallyLoc===e)return this.complete(t.completion,t.afterLoc),P(t),d}},catch:function(e){for(var r=this.tryEntries.length-1;r>=0;--r){var t=this.tryEntries[r];if(t.tryLoc===e){var n=t.completion;if("throw"===n.type){var o=n.arg;P(t)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:M(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),d}},e}("object"===("undefined"==typeof module?"undefined":_typeof(module))?module.exports:{});try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}function t(e){for(var r=void 0,t=e[0],n=1;n<e.length;){var o=e[n],a=e[n+1];if(n+=2,("optionalAccess"===o||"optionalCall"===o)&&null==t)return;"access"===o||"optionalAccess"===o?(r=t,t=a(t)):"call"!==o&&"optionalCall"!==o||(t=a((function(){for(var e,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t).call.apply(e,[r].concat(o))})),r=void 0)}return t}function n(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function o(){return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()}function a(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=o();return Object.defineProperty(window,n,{value:function(o){return r&&Reflect.deleteProperty(window,n),t([e,"optionalCall",function(e){return e(o)}])},writable:!1,configurable:!0}),n}function u(e){return i.apply(this,arguments)}function i(){return(i=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",new Promise((function(e,n){var o=a((function(r){e(r),Reflect.deleteProperty(window,u)}),!0),u=a((function(e){n(e),Reflect.deleteProperty(window,o)}),!0);window.rpc.notify(r,_objectSpread({callback:o,error:u},t))})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var c=Object.freeze({__proto__:null,transformCallback:a,invoke:u});function s(e){return p.apply(this,arguments)}function p(){return(p=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",u("tauri",r));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return(f=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Cli",message:{cmd:"cliMatches"}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var l=Object.freeze({__proto__:null,getMatches:function(){return f.apply(this,arguments)}});function h(){return(h=_asyncToGenerator(regeneratorRuntime.mark((function e(){var r,t=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"object"===_typeof(r=t.length>0&&void 0!==t[0]?t[0]:{})&&Object.freeze(r),e.abrupt("return",s({__tauriModule:"Dialog",mainThread:!0,message:{cmd:"openDialog",options:r}}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=_asyncToGenerator(regeneratorRuntime.mark((function e(){var r,t=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"object"===_typeof(r=t.length>0&&void 0!==t[0]?t[0]:{})&&Object.freeze(r),e.abrupt("return",s({__tauriModule:"Dialog",mainThread:!0,message:{cmd:"saveDialog",options:r}}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d=Object.freeze({__proto__:null,open:function(){return h.apply(this,arguments)},save:function(){return m.apply(this,arguments)}});function y(e,r){return _.apply(this,arguments)}function _(){return(_=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Event",message:{cmd:"listen",event:r,handler:a(t)}}).then((function(e){return _asyncToGenerator(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",g(e));case 1:case"end":return r.stop()}}),r)})))})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e){return v.apply(this,arguments)}function v(){return(v=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Event",message:{cmd:"unlisten",eventId:r}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e,r){return b.apply(this,arguments)}function b(){return(b=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",y(r,t));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,r){return k.apply(this,arguments)}function k(){return(k=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",y(r,(function(e){t(e),g(e.id).catch((function(){}))})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e,r,t){return T.apply(this,arguments)}function T(){return(T=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({__tauriModule:"Event",message:{cmd:"emit",event:r,windowLabel:t,payload:n}});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(){return(G=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",x(r,void 0,t));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P,O=Object.freeze({__proto__:null,emit:function(e,r){return G.apply(this,arguments)},listen:w,once:R});function M(){return(M=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"readTextFile",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"readBinaryFile",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return(F=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"object"===_typeof(t=n.length>1&&void 0!==n[1]?n[1]:{})&&Object.freeze(t),"object"===_typeof(r)&&Object.freeze(r),e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"writeFile",path:r.path,contents:r.contents,options:t}}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(e){e[e.Audio=1]="Audio";e[e.Cache=2]="Cache";e[e.Config=3]="Config";e[e.Data=4]="Data";e[e.LocalData=5]="LocalData";e[e.Desktop=6]="Desktop";e[e.Document=7]="Document";e[e.Download=8]="Download";e[e.Executable=9]="Executable";e[e.Font=10]="Font";e[e.Home=11]="Home";e[e.Picture=12]="Picture";e[e.Public=13]="Public";e[e.Runtime=14]="Runtime";e[e.Template=15]="Template";e[e.Video=16]="Video";e[e.Resource=17]="Resource";e[e.App=18]="App"}(P||(P={}));var S=65536;function C(e){var r=function(e){if(e.length<S)return String.fromCharCode.apply(null,Array.from(e));for(var r="",t=e.length,n=0;n<t;n++){var o=e.subarray(n*S,(n+1)*S);r+=String.fromCharCode.apply(null,Array.from(o))}return r}(new Uint8Array(e));return btoa(r)}function D(){return(D=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"object"===_typeof(t=n.length>1&&void 0!==n[1]?n[1]:{})&&Object.freeze(t),"object"===_typeof(r)&&Object.freeze(r),e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"writeBinaryFile",path:r.path,contents:C(r.contents),options:t}}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return(E=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"readDir",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(){return(L=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"createDir",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(){return(z=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"removeDir",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(){return(A=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){var n,o=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>2&&void 0!==o[2]?o[2]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"copyFile",source:r,destination:t,options:n}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(){return(W=_asyncToGenerator(regeneratorRuntime.mark((function e(r){var t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>1&&void 0!==n[1]?n[1]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"removeFile",path:r,options:t}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(){return(I=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){var n,o=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>2&&void 0!==o[2]?o[2]:{},e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"renameFile",oldPath:r,newPath:t,options:n}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var N=Object.freeze({__proto__:null,get BaseDirectory(){return P},get Dir(){return P},readTextFile:function(e){return M.apply(this,arguments)},readBinaryFile:function(e){return j.apply(this,arguments)},writeFile:function(e){return F.apply(this,arguments)},writeBinaryFile:function(e){return D.apply(this,arguments)},readDir:function(e){return E.apply(this,arguments)},createDir:function(e){return L.apply(this,arguments)},removeDir:function(e){return z.apply(this,arguments)},copyFile:function(e,r){return A.apply(this,arguments)},removeFile:function(e){return W.apply(this,arguments)},renameFile:function(e,r){return I.apply(this,arguments)}});function H(){return(H=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.App}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Audio}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(){return(q=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Cache}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(){return(U=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Config}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(){return(Y=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Data}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(){return(J=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Desktop}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(){return(K=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Document}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return(V=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Download}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(){return(X=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Executable}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(){return($=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Font}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(){return(Q=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Home}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return(Z=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.LocalData}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ee(){return(ee=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Picture}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function re(){return(re=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Public}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(){return(te=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Resource}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ne(){return(ne=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Runtime}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function oe(){return(oe=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Template}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(){return(ae=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:"",directory:P.Video}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(){return(ue=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Fs",message:{cmd:"resolvePath",path:r,directory:t}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ie,ce=Object.freeze({__proto__:null,appDir:function(){return H.apply(this,arguments)},audioDir:function(){return B.apply(this,arguments)},cacheDir:function(){return q.apply(this,arguments)},configDir:function(){return U.apply(this,arguments)},dataDir:function(){return Y.apply(this,arguments)},desktopDir:function(){return J.apply(this,arguments)},documentDir:function(){return K.apply(this,arguments)},downloadDir:function(){return V.apply(this,arguments)},executableDir:function(){return X.apply(this,arguments)},fontDir:function(){return $.apply(this,arguments)},homeDir:function(){return Q.apply(this,arguments)},localDataDir:function(){return Z.apply(this,arguments)},pictureDir:function(){return ee.apply(this,arguments)},publicDir:function(){return re.apply(this,arguments)},resourceDir:function(){return te.apply(this,arguments)},runtimeDir:function(){return ne.apply(this,arguments)},templateDir:function(){return oe.apply(this,arguments)},videoDir:function(){return ae.apply(this,arguments)},resolvePath:function(e,r){return ue.apply(this,arguments)}});function se(e,r){return null!=e?e:r()}function pe(e){for(var r=void 0,t=e[0],n=1;n<e.length;){var o=e[n],a=e[n+1];if(n+=2,("optionalAccess"===o||"optionalCall"===o)&&null==t)return;"access"===o||"optionalAccess"===o?(r=t,t=a(t)):"call"!==o&&"optionalCall"!==o||(t=a((function(){for(var e,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t).call.apply(e,[r].concat(o))})),r=void 0)}return t}!function(e){e[e.JSON=1]="JSON";e[e.Text=2]="Text";e[e.Binary=3]="Binary"}(ie||(ie={}));var fe=function(){function e(r,t){_classCallCheck(this,e),this.type=r,this.payload=t}return _createClass(e,null,[{key:"form",value:function(r){return new e("Form",r)}},{key:"json",value:function(r){return new e("Json",r)}},{key:"text",value:function(r){return new e("Text",r)}},{key:"bytes",value:function(r){return new e("Bytes",r)}}]),e}(),le=function(){function e(r){_classCallCheck(this,e),this.id=r}var r,t,n,o,a,u,i;return _createClass(e,[{key:"drop",value:(i=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Http",message:{cmd:"dropClient",client:this.id}}));case 1:case"end":return e.stop()}}),e,this)}))),function(){return i.apply(this,arguments)})},{key:"request",value:(u=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Http",message:{cmd:"httpRequest",client:this.id,options:r}}));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return u.apply(this,arguments)})},{key:"get",value:(a=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.request(_objectSpread({method:"GET",url:r},t)));case 1:case"end":return e.stop()}}),e,this)}))),function(e,r){return a.apply(this,arguments)})},{key:"post",value:(o=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.request(_objectSpread({method:"POST",url:r,body:t},n)));case 1:case"end":return e.stop()}}),e,this)}))),function(e,r,t){return o.apply(this,arguments)})},{key:"put",value:(n=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.request(_objectSpread({method:"PUT",url:r,body:t},n)));case 1:case"end":return e.stop()}}),e,this)}))),function(e,r,t){return n.apply(this,arguments)})},{key:"patch",value:(t=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.request(_objectSpread({method:"PATCH",url:r},t)));case 1:case"end":return e.stop()}}),e,this)}))),function(e,r){return t.apply(this,arguments)})},{key:"delete",value:(r=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.request(_objectSpread({method:"DELETE",url:r},t)));case 1:case"end":return e.stop()}}),e,this)}))),function(e,t){return r.apply(this,arguments)})}]),e}();function he(e){return me.apply(this,arguments)}function me(){return(me=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Http",message:{cmd:"createClient",options:r}}).then((function(e){return new le(e)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var de=null;function ye(){return(ye=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==de){e.next=4;break}return e.next=3,he();case 3:de=e.sent;case 4:return e.abrupt("return",de.request(_objectSpread({url:r,method:se(pe([t,"optionalAccess",function(e){return e.method}]),(function(){return"GET"}))},t)));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var _e=Object.freeze({__proto__:null,get ResponseType(){return ie},Body:fe,Client:le,getClient:he,fetch:function(e,r){return ye.apply(this,arguments)}});function ge(e,r,t,n){return ve.apply(this,arguments)}function ve(){return(ve=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t,n,o){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"object"===_typeof(o)&&Object.freeze(o),e.abrupt("return",s({__tauriModule:"Shell",message:{cmd:"execute",program:r,sidecar:t,onEventFn:a(n),args:"string"==typeof o?[o]:o}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var we=function(){function e(){_classCallCheck(this,e),e.prototype.__init.call(this)}return _createClass(e,[{key:"__init",value:function(){this.eventListeners={}}},{key:"addEventListener",value:function(e,r){e in this.eventListeners?this.eventListeners[e].push(r):this.eventListeners[e]=[r]}},{key:"_emit",value:function(e,r){if(console.log(e,this.eventListeners),e in this.eventListeners){var t,n=_createForOfIteratorHelper(this.eventListeners[e]);try{for(n.s();!(t=n.n()).done;){(0,t.value)(r)}}catch(e){n.e(e)}finally{n.f()}}}},{key:"on",value:function(e,r){return this.addEventListener(e,r),this}}]),e}(),be=function(e){_inherits(o,e);var r,t,n=_createSuper(o);function o(e){var r,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return _classCallCheck(this,o),r=n.call(this),o.prototype.__init2.call(_assertThisInitialized(r)),o.prototype.__init3.call(_assertThisInitialized(r)),o.prototype.__init4.call(_assertThisInitialized(r)),r.program=e,r.args="string"==typeof t?[t]:t,r}return _createClass(o,[{key:"__init2",value:function(){this.sidecar=!1}},{key:"__init3",value:function(){this.stdout=new we}},{key:"__init4",value:function(){this.stderr=new we}},{key:"spawn",value:(t=_asyncToGenerator(regeneratorRuntime.mark((function e(){var r=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ge(this.program,this.sidecar,(function(e){switch(console.log(e),e.event){case"Error":r._emit("error",e.value);break;case"Finish":r._emit("close",e.value);break;case"Stdout":r.stdout._emit("data",e.value);break;case"Stderr":r.stderr._emit("data",e.value)}}),this.args);case 2:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"execute",value:(r=_asyncToGenerator(regeneratorRuntime.mark((function e(){var r=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){r.on("error",t);var n=[],o=[];r.stdout.on("data",(function(e){n.push(e)})),r.stderr.on("data",(function(e){o.push(e)})),r.on("close",(function(r){e({code:r,stdout:n.join("\n"),stderr:o.join("\n")})})),r.spawn().catch(t)})));case 1:case"end":return e.stop()}}),e)}))),function(){return r.apply(this,arguments)})}],[{key:"sidecar",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=new o(e,r);return t.sidecar=!0,t}}]),o}(we);function Re(){return(Re=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Shell",message:{cmd:"open",path:r,with:t}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ke=Object.freeze({__proto__:null,Command:be,open:function(e,r){return Re.apply(this,arguments)}});function xe(){return window.__TAURI__.__windows}var Te=["tauri://created","tauri://error"],Ge=function(){function e(r){_classCallCheck(this,e),this.label=r,this.listeners={}}var r,t,n;return _createClass(e,[{key:"listen",value:(n=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this._handleTauriEvent(r,t)){e.next=2;break}return e.abrupt("return",Promise.resolve((function(){})));case 2:return e.abrupt("return",w(r,t));case 3:case"end":return e.stop()}}),e,this)}))),function(e,r){return n.apply(this,arguments)})},{key:"once",value:(t=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this._handleTauriEvent(r,t)){e.next=2;break}return e.abrupt("return",Promise.resolve());case 2:return e.abrupt("return",R(r,t));case 3:case"end":return e.stop()}}),e,this)}))),function(e,r){return t.apply(this,arguments)})},{key:"emit",value:(r=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Te.includes(r)){e.next=4;break}n=_createForOfIteratorHelper(this.listeners[r]||[]);try{for(n.s();!(o=n.n()).done;)(0,o.value)({event:r,id:-1,payload:t})}catch(e){n.e(e)}finally{n.f()}return e.abrupt("return",Promise.resolve());case 4:return e.abrupt("return",x(r,this.label,t));case 5:case"end":return e.stop()}}),e,this)}))),function(e,t){return r.apply(this,arguments)})},{key:"_handleTauriEvent",value:function(e,r){return!!Te.includes(e)&&(e in this.listeners?this.listeners[e].push(r):this.listeners[e]=[r],!0)}}]),e}(),Pe=function(e){_inherits(t,e);var r=_createSuper(t);function t(e){var n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return _classCallCheck(this,t),n=r.call(this,e),s({__tauriModule:"Window",message:{cmd:"createWebview",options:_objectSpread({label:e},o)}}).then(_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.emit("tauri://created"));case 1:case"end":return e.stop()}}),e)})))).catch(function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.emit("tauri://error",r));case 1:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()),n}return _createClass(t,null,[{key:"getByLabel",value:function(e){return xe().some((function(r){return r.label===e}))?new Ge(e):null}}]),t}(Ge),Oe=new(function(){function e(){_classCallCheck(this,e)}var r,t,n,o,a,u,i,c,p,f,l,h,m,d,y,_,g,v,w,b,R;return _createClass(e,[{key:"setResizable",value:(R=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setResizable",resizable:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return R.apply(this,arguments)})},{key:"setTitle",value:(b=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setTitle",title:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return b.apply(this,arguments)})},{key:"maximize",value:(w=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"maximize"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return w.apply(this,arguments)})},{key:"unmaximize",value:(v=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"unmaximize"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return v.apply(this,arguments)})},{key:"minimize",value:(g=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"minimize"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return g.apply(this,arguments)})},{key:"unminimize",value:(_=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"unminimize"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return _.apply(this,arguments)})},{key:"show",value:(y=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"show"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return y.apply(this,arguments)})},{key:"hide",value:(d=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"hide"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return d.apply(this,arguments)})},{key:"close",value:(m=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"close"}}));case 1:case"end":return e.stop()}}),e)}))),function(){return m.apply(this,arguments)})},{key:"setDecorations",value:(h=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setDecorations",decorations:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return h.apply(this,arguments)})},{key:"setAlwaysOnTop",value:(l=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setAlwaysOnTop",alwaysOnTop:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return l.apply(this,arguments)})},{key:"setWidth",value:(f=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setWidth",width:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return f.apply(this,arguments)})},{key:"setHeight",value:(p=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setHeight",height:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return p.apply(this,arguments)})},{key:"resize",value:(c=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"resize",width:r,height:t}}));case 1:case"end":return e.stop()}}),e)}))),function(e,r){return c.apply(this,arguments)})},{key:"setMinSize",value:(i=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setMinSize",minWidth:r,minHeight:t}}));case 1:case"end":return e.stop()}}),e)}))),function(e,r){return i.apply(this,arguments)})},{key:"setMaxSize",value:(u=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setMaxSize",maxWidth:r,maxHeight:t}}));case 1:case"end":return e.stop()}}),e)}))),function(e,r){return u.apply(this,arguments)})},{key:"setX",value:(a=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setX",x:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return a.apply(this,arguments)})},{key:"setY",value:(o=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setY",y:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return o.apply(this,arguments)})},{key:"setPosition",value:(n=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setPosition",x:r,y:t}}));case 1:case"end":return e.stop()}}),e)}))),function(e,r){return n.apply(this,arguments)})},{key:"setFullscreen",value:(t=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setFullscreen",fullscreen:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})},{key:"setIcon",value:(r=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"Window",message:{cmd:"setIcon",icon:r}}));case 1:case"end":return e.stop()}}),e)}))),function(e){return r.apply(this,arguments)})}]),e}()),Me=Object.freeze({__proto__:null,WebviewWindow:Pe,getCurrent:function(){return new Ge(window.__TAURI__.__currentWindow.label)},getAll:xe,appWindow:Oe});function je(){return(je=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("default"===window.Notification.permission){e.next=2;break}return e.abrupt("return",Promise.resolve("granted"===window.Notification.permission));case 2:return e.abrupt("return",s({__tauriModule:"Notification",message:{cmd:"isNotificationPermissionGranted"}}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Fe(){return(Fe=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",window.Notification.requestPermission());case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Se=Object.freeze({__proto__:null,sendNotification:function(e){"string"==typeof e?new window.Notification(e):new window.Notification(e.title,e)},requestPermission:function(){return Fe.apply(this,arguments)},isPermissionGranted:function(){return je.apply(this,arguments)}});function Ce(){return(Ce=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"GlobalShortcut",message:{cmd:"register",shortcut:r,handler:a(t)}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function De(){return(De=_asyncToGenerator(regeneratorRuntime.mark((function e(r,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"GlobalShortcut",message:{cmd:"registerAll",shortcuts:r,handler:a(t)}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ee(){return(Ee=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"GlobalShortcut",message:{cmd:"isRegistered",shortcut:r}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Le(){return(Le=_asyncToGenerator(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"GlobalShortcut",message:{cmd:"unregister",shortcut:r}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ze(){return(ze=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s({__tauriModule:"GlobalShortcut",message:{cmd:"unregisterAll"}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Ae=Object.freeze({__proto__:null,register:function(e,r){return Ce.apply(this,arguments)},registerAll:function(e,r){return De.apply(this,arguments)},isRegistered:function(e){return Ee.apply(this,arguments)},unregister:function(e){return Le.apply(this,arguments)},unregisterAll:function(){return ze.apply(this,arguments)}});e.cli=l,e.dialog=d,e.event=O,e.fs=N,e.globalShortcut=Ae,e.http=_e,e.notification=Se,e.path=ce,e.shell=ke,e.tauri=c,e.window=Me,Object.defineProperty(e,"__esModule",{value:!0})}));


// polyfills
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

(function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  var uid = function () {
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        );
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  if (!window.__TAURI__) {
    window.__TAURI__ = {};
  }

  window.__TAURI__.transformCallback = function transformCallback(
    callback,
    once
  ) {
    var identifier = uid();

    window[identifier] = function (result) {
      if (once) {
        delete window[identifier];
      }

      return callback && callback(result);
    };

    return identifier;
  };

  window.__TAURI__.invoke = function invoke(cmd, args = {}) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var callback = _this.transformCallback(function (r) {
        resolve(r);
        delete window[error];
      }, true);
      var error = _this.transformCallback(function (e) {
        reject(e);
        delete window[callback];
      }, true);

      if (typeof cmd === "string") {
        args.cmd = cmd;
      } else if (typeof cmd === "object") {
        args = cmd;
      } else {
        return reject(new Error("Invalid argument type."));
      }

      if (window.rpc) {
        window.rpc.notify(
          cmd,
          _objectSpread(
            {
              callback: callback,
              error: error,
            },
            args
          )
        );
      } else {
        window.addEventListener("DOMContentLoaded", function () {
          window.rpc.notify(
            cmd,
            _objectSpread(
              {
                callback: callback,
                error: error,
              },
              args
            )
          );
        });
      }
    });
  };

  // open <a href="..."> links with the Tauri API
  function __openLinks() {
    document.querySelector("body").addEventListener(
      "click",
      function (e) {
        var target = e.target;
        while (target != null) {
          if (
            target.matches ? target.matches("a") : target.msMatchesSelector("a")
          ) {
            if (
              target.href &&
              target.href.startsWith("http") &&
              target.target === "_blank"
            ) {
              window.__TAURI__.invoke('tauri', {
                __tauriModule: "Shell",
                message: {
                  cmd: "open",
                  path: target.href,
                },
              });
              e.preventDefault();
            }
            break;
          }
          target = target.parentElement;
        }
      },
      true
    );
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    __openLinks();
  } else {
    window.addEventListener(
      "DOMContentLoaded",
      function () {
        __openLinks();
      },
      true
    );
  }

  window.__TAURI__.invoke('tauri', {
    __tauriModule: "Event",
    message: {
      cmd: "listen",
      event: "tauri://window-created",
      handler: window.__TAURI__.transformCallback(function (event) {
        if (event.payload) {
          var windowLabel = event.payload.label;
          window.__TAURI__.__windows.push({ label: windowLabel });
        }
      }),
    },
  });

  let permissionSettable = false;
  let permissionValue = "default";

  function isPermissionGranted() {
    if (window.Notification.permission !== "default") {
      return Promise.resolve(window.Notification.permission === "granted");
    }
    return window.__TAURI__.invoke('tauri', {
      __tauriModule: "Notification",
      message: {
        cmd: "isNotificationPermissionGranted",
      },
    });
  }

  function setNotificationPermission(value) {
    permissionSettable = true;
    window.Notification.permission = value;
    permissionSettable = false;
  }

  function requestPermission() {
    return window.__TAURI__
      .invoke('tauri', {
        __tauriModule: "Notification",
        mainThread: true,
        message: {
          cmd: "requestNotificationPermission",
        },
      })
      .then(function (permission) {
        setNotificationPermission(permission);
        return permission;
      });
  }

  function sendNotification(options) {
    if (typeof options === "object") {
      Object.freeze(options);
    }

    isPermissionGranted().then(function (permission) {
      if (permission) {
        return window.__TAURI__.invoke('tauri', {
          __tauriModule: "Notification",
          message: {
            cmd: "notification",
            options:
              typeof options === "string"
                ? {
                    title: options,
                  }
                : options,
          },
        });
      }
    });
  }

  window.Notification = function (title, options) {
    var opts = options || {};
    sendNotification(
      Object.assign(opts, {
        title: title,
      })
    );
  };

  window.Notification.requestPermission = requestPermission;

  Object.defineProperty(window.Notification, "permission", {
    enumerable: true,
    get: function () {
      return permissionValue;
    },
    set: function (v) {
      if (!permissionSettable) {
        throw new Error("Readonly property");
      }
      permissionValue = v;
    },
  });

  isPermissionGranted().then(function (response) {
    if (response === null) {
      setNotificationPermission("default");
    } else {
      setNotificationPermission(response ? "granted" : "denied");
    }
  });

  window.alert = function (message) {
    window.__TAURI__.invoke('tauri', {
      __tauriModule: "Dialog",
      mainThread: true,
      message: {
        cmd: "messageDialog",
        message: message,
      },
    });
  };

  window.confirm = function (message) {
    return window.__TAURI__.invoke('tauri', {
      __tauriModule: "Dialog",
      mainThread: true,
      message: {
        cmd: "askDialog",
        message: message,
      },
    });
  };
})();
