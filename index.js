(function(Oe,Ie,Ae,oe,Se,ft,ke,We){"use strict";var je={exports:{}},d={},qe;function lt(){if(qe)return d;qe=1;var R=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),X=Symbol.for("react.profiler"),M=Symbol.for("react.consumer"),ue=Symbol.for("react.context"),Z=Symbol.for("react.forward_ref"),se=Symbol.for("react.suspense"),q=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),V=Symbol.iterator;function ie(n){return n===null||typeof n!="object"?null:(n=V&&n[V]||n["@@iterator"],typeof n=="function"?n:null)}var ae={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ce=Object.assign,L={};function P(n,o,f){this.props=n,this.context=o,this.refs=L,this.updater=f||ae}P.prototype.isReactComponent={},P.prototype.setState=function(n,o){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,o,"setState")},P.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function x(){}x.prototype=P.prototype;function Y(n,o,f){this.props=n,this.context=o,this.refs=L,this.updater=f||ae}var z=Y.prototype=new x;z.constructor=Y,ce(z,P.prototype),z.isPureReactComponent=!0;var fe=Array.isArray,y={H:null,A:null,T:null,S:null},B=Object.prototype.hasOwnProperty;function J(n,o,f,l,h,m){return f=m.ref,{$$typeof:R,type:n,key:o,ref:f!==void 0?f:null,props:m}}function le(n,o){return J(n.type,o,void 0,void 0,void 0,n.props)}function b(n){return typeof n=="object"&&n!==null&&n.$$typeof===R}function de(n){var o={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(f){return o[f]})}var pe=/\/+/g;function F(n,o){return typeof n=="object"&&n!==null&&n.key!=null?de(""+n.key):o.toString(36)}function D(){}function ve(n){switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:switch(typeof n.status=="string"?n.then(D,D):(n.status="pending",n.then(function(o){n.status==="pending"&&(n.status="fulfilled",n.value=o)},function(o){n.status==="pending"&&(n.status="rejected",n.reason=o)})),n.status){case"fulfilled":return n.value;case"rejected":throw n.reason}}throw n}function H(n,o,f,l,h){var m=typeof n;(m==="undefined"||m==="boolean")&&(n=null);var p=!1;if(n===null)p=!0;else switch(m){case"bigint":case"string":case"number":p=!0;break;case"object":switch(n.$$typeof){case R:case c:p=!0;break;case k:return p=n._init,H(p(n._payload),o,f,l,h)}}if(p)return h=h(n),p=l===""?"."+F(n,0):l,fe(h)?(f="",p!=null&&(f=p.replace(pe,"$&/")+"/"),H(h,o,f,"",function(ee){return ee})):h!=null&&(b(h)&&(h=le(h,f+(h.key==null||n&&n.key===h.key?"":(""+h.key).replace(pe,"$&/")+"/")+p)),o.push(h)),1;p=0;var A=l===""?".":l+":";if(fe(n))for(var _=0;_<n.length;_++)l=n[_],m=A+F(l,_),p+=H(l,o,f,m,h);else if(_=ie(n),typeof _=="function")for(n=_.call(n),_=0;!(l=n.next()).done;)l=l.value,m=A+F(l,_++),p+=H(l,o,f,m,h);else if(m==="object"){if(typeof n.then=="function")return H(ve(n),o,f,l,h);throw o=String(n),Error("Objects are not valid as a React child (found: "+(o==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":o)+"). If you meant to render a collection of children, use an array instead.")}return p}function O(n,o,f){if(n==null)return n;var l=[],h=0;return H(n,l,"","",function(m){return o.call(f,m,h++)}),l}function G(n){if(n._status===-1){var o=n._result;o=o(),o.then(function(f){(n._status===0||n._status===-1)&&(n._status=1,n._result=f)},function(f){(n._status===0||n._status===-1)&&(n._status=2,n._result=f)}),n._status===-1&&(n._status=0,n._result=o)}if(n._status===1)return n._result.default;throw n._result}var he=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var o=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(o))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function C(){}return d.Children={map:O,forEach:function(n,o,f){O(n,function(){o.apply(this,arguments)},f)},count:function(n){var o=0;return O(n,function(){o++}),o},toArray:function(n){return O(n,function(o){return o})||[]},only:function(n){if(!b(n))throw Error("React.Children.only expected to receive a single React element child.");return n}},d.Component=P,d.Fragment=N,d.Profiler=X,d.PureComponent=Y,d.StrictMode=S,d.Suspense=se,d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=y,d.act=function(){throw Error("act(...) is not supported in production builds of React.")},d.cache=function(n){return function(){return n.apply(null,arguments)}},d.cloneElement=function(n,o,f){if(n==null)throw Error("The argument must be a React element, but you passed "+n+".");var l=ce({},n.props),h=n.key,m=void 0;if(o!=null)for(p in o.ref!==void 0&&(m=void 0),o.key!==void 0&&(h=""+o.key),o)!B.call(o,p)||p==="key"||p==="__self"||p==="__source"||p==="ref"&&o.ref===void 0||(l[p]=o[p]);var p=arguments.length-2;if(p===1)l.children=f;else if(1<p){for(var A=Array(p),_=0;_<p;_++)A[_]=arguments[_+2];l.children=A}return J(n.type,h,void 0,void 0,m,l)},d.createContext=function(n){return n={$$typeof:ue,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider=n,n.Consumer={$$typeof:M,_context:n},n},d.createElement=function(n,o,f){var l,h={},m=null;if(o!=null)for(l in o.key!==void 0&&(m=""+o.key),o)B.call(o,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(h[l]=o[l]);var p=arguments.length-2;if(p===1)h.children=f;else if(1<p){for(var A=Array(p),_=0;_<p;_++)A[_]=arguments[_+2];h.children=A}if(n&&n.defaultProps)for(l in p=n.defaultProps,p)h[l]===void 0&&(h[l]=p[l]);return J(n,m,void 0,void 0,null,h)},d.createRef=function(){return{current:null}},d.forwardRef=function(n){return{$$typeof:Z,render:n}},d.isValidElement=b,d.lazy=function(n){return{$$typeof:k,_payload:{_status:-1,_result:n},_init:G}},d.memo=function(n,o){return{$$typeof:q,type:n,compare:o===void 0?null:o}},d.startTransition=function(n){var o=y.T,f={};y.T=f;try{var l=n(),h=y.S;h!==null&&h(f,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(C,he)}catch(m){he(m)}finally{y.T=o}},d.unstable_useCacheRefresh=function(){return y.H.useCacheRefresh()},d.use=function(n){return y.H.use(n)},d.useActionState=function(n,o,f){return y.H.useActionState(n,o,f)},d.useCallback=function(n,o){return y.H.useCallback(n,o)},d.useContext=function(n){return y.H.useContext(n)},d.useDebugValue=function(){},d.useDeferredValue=function(n,o){return y.H.useDeferredValue(n,o)},d.useEffect=function(n,o){return y.H.useEffect(n,o)},d.useId=function(){return y.H.useId()},d.useImperativeHandle=function(n,o,f){return y.H.useImperativeHandle(n,o,f)},d.useInsertionEffect=function(n,o){return y.H.useInsertionEffect(n,o)},d.useLayoutEffect=function(n,o){return y.H.useLayoutEffect(n,o)},d.useMemo=function(n,o){return y.H.useMemo(n,o)},d.useOptimistic=function(n,o){return y.H.useOptimistic(n,o)},d.useReducer=function(n,o,f){return y.H.useReducer(n,o,f)},d.useRef=function(n){return y.H.useRef(n)},d.useState=function(n){return y.H.useState(n)},d.useSyncExternalStore=function(n,o,f){return y.H.useSyncExternalStore(n,o,f)},d.useTransition=function(){return y.H.useTransition()},d.version="19.0.0",d}var K={exports:{}};K.exports;var xe;function dt(){return xe||(xe=1,function(R,c){process.env.NODE_ENV!=="production"&&function(){function N(e,t){Object.defineProperty(M.prototype,e,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}function S(e){return e===null||typeof e!="object"?null:(e=Be&&e[Be]||e["@@iterator"],typeof e=="function"?e:null)}function X(e,t){e=(e=e.constructor)&&(e.displayName||e.name)||"ReactClass";var r=e+"."+t;De[r]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,e),De[r]=!0)}function M(e,t,r){this.props=e,this.context=t,this.refs=$e,this.updater=r||Ge}function ue(){}function Z(e,t,r){this.props=e,this.context=t,this.refs=$e,this.updater=r||Ge}function se(e){return""+e}function q(e){try{se(e);var t=!1}catch{t=!0}if(t){t=console;var r=t.error,u=typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return r.call(t,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",u),se(e)}}function k(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===wt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _:return"Fragment";case A:return"Portal";case Ne:return"Profiler";case ee:return"StrictMode";case ye:return"Suspense";case Pe:return"SuspenseList"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case Me:return(e.displayName||"Context")+".Provider";case Ee:return(e._context.displayName||"Context")+".Consumer";case ge:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case te:return t=e.displayName||null,t!==null?t:k(e.type)||"Memo";case ne:t=e._payload,e=e._init;try{return k(e(t))}catch{}}return null}function V(e){return typeof e=="string"||typeof e=="function"||e===_||e===Ne||e===ee||e===ye||e===Pe||e===_t||typeof e=="object"&&e!==null&&(e.$$typeof===ne||e.$$typeof===te||e.$$typeof===Me||e.$$typeof===Ee||e.$$typeof===ge||e.$$typeof===Ct||e.getModuleId!==void 0)}function ie(){}function ae(){if(re===0){Ke=console.log,Qe=console.info,Xe=console.warn,Ze=console.error,Ve=console.group,Je=console.groupCollapsed,Fe=console.groupEnd;var e={configurable:!0,enumerable:!0,value:ie,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}re++}function ce(){if(re--,re===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:$({},e,{value:Ke}),info:$({},e,{value:Qe}),warn:$({},e,{value:Xe}),error:$({},e,{value:Ze}),group:$({},e,{value:Ve}),groupCollapsed:$({},e,{value:Je}),groupEnd:$({},e,{value:Fe})})}0>re&&console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}function L(e){if(Ue===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Ue=t&&t[1]||"",et=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ue+e+et}function P(e,t){if(!e||Ye)return"";var r=He.get(e);if(r!==void 0)return r;Ye=!0,r=Error.prepareStackTrace,Error.prepareStackTrace=void 0;var u=null;u=v.H,v.H=null,ae();try{var s={DetermineComponentFrameRoot:function(){try{if(t){var j=function(){throw Error()};if(Object.defineProperty(j.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(j,[])}catch(U){var be=U}Reflect.construct(e,[],j)}else{try{j.call()}catch(U){be=U}e.call(j.prototype)}}else{try{throw Error()}catch(U){be=U}(j=e())&&typeof j.catch=="function"&&j.catch(function(){})}}catch(U){if(U&&be&&typeof U.stack=="string")return[U.stack,be.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=s.DetermineComponentFrameRoot(),g=i[0],E=i[1];if(g&&E){var w=g.split(`
`),T=E.split(`
`);for(i=a=0;a<w.length&&!w[a].includes("DetermineComponentFrameRoot");)a++;for(;i<T.length&&!T[i].includes("DetermineComponentFrameRoot");)i++;if(a===w.length||i===T.length)for(a=w.length-1,i=T.length-1;1<=a&&0<=i&&w[a]!==T[i];)i--;for(;1<=a&&0<=i;a--,i--)if(w[a]!==T[i]){if(a!==1||i!==1)do if(a--,i--,0>i||w[a]!==T[i]){var W=`
`+w[a].replace(" at new "," at ");return e.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",e.displayName)),typeof e=="function"&&He.set(e,W),W}while(1<=a&&0<=i);break}}}finally{Ye=!1,v.H=u,ce(),Error.prepareStackTrace=r}return w=(w=e?e.displayName||e.name:"")?L(w):"",typeof e=="function"&&He.set(e,w),w}function x(e){if(e==null)return"";if(typeof e=="function"){var t=e.prototype;return P(e,!(!t||!t.isReactComponent))}if(typeof e=="string")return L(e);switch(e){case ye:return L("Suspense");case Pe:return L("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case ge:return e=P(e.render,!1),e;case te:return x(e.type);case ne:t=e._payload,e=e._init;try{return x(e(t))}catch{}}return""}function Y(){var e=v.A;return e===null?null:e.getOwner()}function z(e){if(we.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function fe(e,t){function r(){tt||(tt=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",t))}r.isReactWarning=!0,Object.defineProperty(e,"key",{get:r,configurable:!0})}function y(){var e=k(this.type);return rt[e]||(rt[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),e=this.props.ref,e!==void 0?e:null}function B(e,t,r,u,s,a){return r=a.ref,e={$$typeof:p,type:e,key:t,props:a,_owner:s},(r!==void 0?r:null)!==null?Object.defineProperty(e,"ref",{enumerable:!1,get:y}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}function J(e,t){return t=B(e.type,t,void 0,void 0,e._owner,e.props),t._store.validated=e._store.validated,t}function le(e,t){if(typeof e=="object"&&e&&e.$$typeof!==Rt){if(_e(e))for(var r=0;r<e.length;r++){var u=e[r];b(u)&&de(u,t)}else if(b(e))e._store&&(e._store.validated=1);else if(r=S(e),typeof r=="function"&&r!==e.entries&&(r=r.call(e),r!==e))for(;!(e=r.next()).done;)b(e.value)&&de(e.value,t)}}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===p}function de(e,t){if(e._store&&!e._store.validated&&e.key==null&&(e._store.validated=1,t=pe(t),!ot[t])){ot[t]=!0;var r="";e&&e._owner!=null&&e._owner!==Y()&&(r=null,typeof e._owner.tag=="number"?r=k(e._owner.type):typeof e._owner.name=="string"&&(r=e._owner.name),r=" It was passed a child from "+r+".");var u=v.getCurrentStack;v.getCurrentStack=function(){var s=x(e.type);return u&&(s+=u()||""),s},console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',t,r),v.getCurrentStack=u}}function pe(e){var t="",r=Y();return r&&(r=k(r.type))&&(t=`

Check the render method of \``+r+"`."),t||(e=k(e))&&(t=`

Check the top-level render call using <`+e+">."),t}function F(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}function D(e,t){return typeof e=="object"&&e!==null&&e.key!=null?(q(e.key),F(""+e.key)):t.toString(36)}function ve(){}function H(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(ve,ve):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function O(e,t,r,u,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"bigint":case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case p:case A:i=!0;break;case ne:return i=e._init,O(i(e._payload),t,r,u,s)}}if(i){i=e,s=s(i);var g=u===""?"."+D(i,0):u;return _e(s)?(r="",g!=null&&(r=g.replace(st,"$&/")+"/"),O(s,t,r,"",function(w){return w})):s!=null&&(b(s)&&(s.key!=null&&(i&&i.key===s.key||q(s.key)),r=J(s,r+(s.key==null||i&&i.key===s.key?"":(""+s.key).replace(st,"$&/")+"/")+g),u!==""&&i!=null&&b(i)&&i.key==null&&i._store&&!i._store.validated&&(r._store.validated=2),s=r),t.push(s)),1}if(i=0,g=u===""?".":u+":",_e(e))for(var E=0;E<e.length;E++)u=e[E],a=g+D(u,E),i+=O(u,t,r,a,s);else if(E=S(e),typeof E=="function")for(E===e.entries&&(ut||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ut=!0),e=E.call(e),E=0;!(u=e.next()).done;)u=u.value,a=g+D(u,E++),i+=O(u,t,r,a,s);else if(a==="object"){if(typeof e.then=="function")return O(H(e),t,r,u,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return i}function G(e,t,r){if(e==null)return e;var u=[],s=0;return O(e,u,"","",function(a){return t.call(r,a,s++)}),u}function he(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return t=e._result,t===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,t),"default"in t||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,t),t.default;throw e._result}function C(){var e=v.H;return e===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function n(){}function o(e){if(Ce===null)try{var t=("require"+Math.random()).slice(0,7);Ce=(R&&R[t]).call(R,"timers").setImmediate}catch{Ce=function(u){at===!1&&(at=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var s=new MessageChannel;s.port1.onmessage=u,s.port2.postMessage(void 0)}}return Ce(e)}function f(e){return 1<e.length&&typeof AggregateError=="function"?new AggregateError(e):e[0]}function l(e,t){t!==Re-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),Re=t}function h(e,t,r){var u=v.actQueue;if(u!==null)if(u.length!==0)try{m(u),o(function(){return h(e,t,r)});return}catch(s){v.thrownErrors.push(s)}else v.actQueue=null;0<v.thrownErrors.length?(u=f(v.thrownErrors),v.thrownErrors.length=0,r(u)):t(e)}function m(e){if(!Le){Le=!0;var t=0;try{for(;t<e.length;t++){var r=e[t];do{v.didUsePromise=!1;var u=r(!1);if(u!==null){if(v.didUsePromise){e[t]=r,e.splice(0,t);return}r=u}else break}while(1)}e.length=0}catch(s){e.splice(0,t+1),v.thrownErrors.push(s)}finally{Le=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var p=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),ee=Symbol.for("react.strict_mode"),Ne=Symbol.for("react.profiler"),Ee=Symbol.for("react.consumer"),Me=Symbol.for("react.context"),ge=Symbol.for("react.forward_ref"),ye=Symbol.for("react.suspense"),Pe=Symbol.for("react.suspense_list"),te=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),_t=Symbol.for("react.offscreen"),Be=Symbol.iterator,De={},Ge={isMounted:function(){return!1},enqueueForceUpdate:function(e){X(e,"forceUpdate")},enqueueReplaceState:function(e){X(e,"replaceState")},enqueueSetState:function(e){X(e,"setState")}},$=Object.assign,$e={};Object.freeze($e),M.prototype.isReactComponent={},M.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},M.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var I={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},me;for(me in I)I.hasOwnProperty(me)&&N(me,I[me]);ue.prototype=M.prototype,I=Z.prototype=new ue,I.constructor=Z,$(I,M.prototype),I.isPureReactComponent=!0;var _e=Array.isArray,wt=Symbol.for("react.client.reference"),v={H:null,A:null,T:null,S:null,actQueue:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null},we=Object.prototype.hasOwnProperty,Ct=Symbol.for("react.client.reference"),re=0,Ke,Qe,Xe,Ze,Ve,Je,Fe;ie.__reactDisabledLog=!0;var Ue,et,Ye=!1,He=new(typeof WeakMap=="function"?WeakMap:Map),Rt=Symbol.for("react.client.reference"),tt,nt,rt={},ot={},ut=!1,st=/\/+/g,it=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},at=!1,Ce=null,Re=0,Te=!1,Le=!1,ct=typeof queueMicrotask=="function"?function(e){queueMicrotask(function(){return queueMicrotask(e)})}:o;c.Children={map:G,forEach:function(e,t,r){G(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return G(e,function(){t++}),t},toArray:function(e){return G(e,function(t){return t})||[]},only:function(e){if(!b(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},c.Component=M,c.Fragment=_,c.Profiler=Ne,c.PureComponent=Z,c.StrictMode=ee,c.Suspense=ye,c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=v,c.act=function(e){var t=v.actQueue,r=Re;Re++;var u=v.actQueue=t!==null?t:[],s=!1;try{var a=e()}catch(E){v.thrownErrors.push(E)}if(0<v.thrownErrors.length)throw l(t,r),e=f(v.thrownErrors),v.thrownErrors.length=0,e;if(a!==null&&typeof a=="object"&&typeof a.then=="function"){var i=a;return ct(function(){s||Te||(Te=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(E,w){s=!0,i.then(function(T){if(l(t,r),r===0){try{m(u),o(function(){return h(T,E,w)})}catch(j){v.thrownErrors.push(j)}if(0<v.thrownErrors.length){var W=f(v.thrownErrors);v.thrownErrors.length=0,w(W)}}else E(T)},function(T){l(t,r),0<v.thrownErrors.length&&(T=f(v.thrownErrors),v.thrownErrors.length=0),w(T)})}}}var g=a;if(l(t,r),r===0&&(m(u),u.length!==0&&ct(function(){s||Te||(Te=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),v.actQueue=null),0<v.thrownErrors.length)throw e=f(v.thrownErrors),v.thrownErrors.length=0,e;return{then:function(E,w){s=!0,r===0?(v.actQueue=u,o(function(){return h(g,E,w)})):E(g)}}},c.cache=function(e){return function(){return e.apply(null,arguments)}},c.cloneElement=function(e,t,r){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var u=$({},e.props),s=e.key,a=e._owner;if(t!=null){var i;e:{if(we.call(t,"ref")&&(i=Object.getOwnPropertyDescriptor(t,"ref").get)&&i.isReactWarning){i=!1;break e}i=t.ref!==void 0}i&&(a=Y()),z(t)&&(q(t.key),s=""+t.key);for(g in t)!we.call(t,g)||g==="key"||g==="__self"||g==="__source"||g==="ref"&&t.ref===void 0||(u[g]=t[g])}var g=arguments.length-2;if(g===1)u.children=r;else if(1<g){i=Array(g);for(var E=0;E<g;E++)i[E]=arguments[E+2];u.children=i}for(u=B(e.type,s,void 0,void 0,a,u),s=2;s<arguments.length;s++)le(arguments[s],u.type);return u},c.createContext=function(e){return e={$$typeof:Me,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Ee,_context:e},e._currentRenderer=null,e._currentRenderer2=null,e},c.createElement=function(e,t,r){if(V(e))for(var u=2;u<arguments.length;u++)le(arguments[u],e);else{if(u="",(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(u+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."),e===null)var s="null";else _e(e)?s="array":e!==void 0&&e.$$typeof===p?(s="<"+(k(e.type)||"Unknown")+" />",u=" Did you accidentally export a JSX literal instead of a component?"):s=typeof e;console.error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",s,u)}var a;if(u={},s=null,t!=null)for(a in nt||!("__self"in t)||"key"in t||(nt=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),z(t)&&(q(t.key),s=""+t.key),t)we.call(t,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(u[a]=t[a]);var i=arguments.length-2;if(i===1)u.children=r;else if(1<i){for(var g=Array(i),E=0;E<i;E++)g[E]=arguments[E+2];Object.freeze&&Object.freeze(g),u.children=g}if(e&&e.defaultProps)for(a in i=e.defaultProps,i)u[a]===void 0&&(u[a]=i[a]);return s&&fe(u,typeof e=="function"?e.displayName||e.name||"Unknown":e),B(e,s,void 0,void 0,Y(),u)},c.createRef=function(){var e={current:null};return Object.seal(e),e},c.forwardRef=function(e){e!=null&&e.$$typeof===te?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?console.error("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&e.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var t={$$typeof:ge,render:e},r;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return r},set:function(u){r=u,e.name||e.displayName||(Object.defineProperty(e,"name",{value:u}),e.displayName=u)}}),t},c.isValidElement=b,c.lazy=function(e){return{$$typeof:ne,_payload:{_status:-1,_result:e},_init:he}},c.memo=function(e,t){V(e)||console.error("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e),t={$$typeof:te,type:e,compare:t===void 0?null:t};var r;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return r},set:function(u){r=u,e.name||e.displayName||(Object.defineProperty(e,"name",{value:u}),e.displayName=u)}}),t},c.startTransition=function(e){var t=v.T,r={};v.T=r,r._updatedFibers=new Set;try{var u=e(),s=v.S;s!==null&&s(r,u),typeof u=="object"&&u!==null&&typeof u.then=="function"&&u.then(n,it)}catch(a){it(a)}finally{t===null&&r._updatedFibers&&(e=r._updatedFibers.size,r._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),v.T=t}},c.unstable_useCacheRefresh=function(){return C().useCacheRefresh()},c.use=function(e){return C().use(e)},c.useActionState=function(e,t,r){return C().useActionState(e,t,r)},c.useCallback=function(e,t){return C().useCallback(e,t)},c.useContext=function(e){var t=C();return e.$$typeof===Ee&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),t.useContext(e)},c.useDebugValue=function(e,t){return C().useDebugValue(e,t)},c.useDeferredValue=function(e,t){return C().useDeferredValue(e,t)},c.useEffect=function(e,t){return C().useEffect(e,t)},c.useId=function(){return C().useId()},c.useImperativeHandle=function(e,t,r){return C().useImperativeHandle(e,t,r)},c.useInsertionEffect=function(e,t){return C().useInsertionEffect(e,t)},c.useLayoutEffect=function(e,t){return C().useLayoutEffect(e,t)},c.useMemo=function(e,t){return C().useMemo(e,t)},c.useOptimistic=function(e,t){return C().useOptimistic(e,t)},c.useReducer=function(e,t,r){return C().useReducer(e,t,r)},c.useRef=function(e){return C().useRef(e)},c.useState=function(e){return C().useState(e)},c.useSyncExternalStore=function(e,t,r){return C().useSyncExternalStore(e,t,r)},c.useTransition=function(){return C().useTransition()},c.version="19.0.0",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}(K,K.exports)),K.exports}process.env.NODE_ENV==="production"?je.exports=lt():je.exports=dt();var Q=je.exports;const pt=function(){const[R,c]=Q.useState(""),N=function(){let S=We.storage.get("excludedUsers",[]);R&&!S.includes(R)&&(S.push(R),We.storage.set("excludedUsers",S),console.log("Saved excluded user:",R),c(""))};return Q.React.createElement(Q.React.Fragment,null,Q.React.createElement(Ae.TextInput,{label:"Exclude User ID",value:R,onChange:c}),Q.React.createElement(Ae.Button,{onClick:N},"Save Excluded User"))},vt=ke.findByProps("getUnreadGuilds"),ht=ke.findByProps("markRead");Se.storage.get("excludedUsers")||Se.storage.set("excludedUsers",[]);const Et=function(){console.log("\u{1F4E9} Mark All as Read button clicked.");const R=vt?.getUnreadGuilds?.()||[],c=Se.storage.get("excludedUsers",[]),N=R.filter(function(S){return!c.includes(S)});if(N.length===0){oe.showToast("All unread messages are from excluded users.",oe.ToastType.INFO);return}console.log("\u2705 Marking these as read:",N),ht.markRead(N),oe.showToast("\u2705 Marked all messages as read!",oe.ToastType.SUCCESS)},gt=function(){return Ie.React.createElement(Ae.Button,{onClick:Et,style:{padding:10,backgroundColor:"blue",color:"white"}},"\u{1F4E9} Mark All as Read")},yt=ke.findByProps("ChannelItem"),ze=ft.after("render",yt,function(R,c){return c?.props?.children&&(console.log("\u{1F535} Injecting MarkAllReadButton..."),c.props.children.push(Ie.React.createElement(gt,null))),c});var mt={onLoad:function(){console.log("\u2705 Read All Messages Plugin Loaded!"),ze()},onUnload:function(){return ze?.()},settings:pt};return Oe.default=mt,Object.defineProperty(Oe,"__esModule",{value:!0}),Oe})({},vendetta,vendetta.ui.components,vendetta.ui.toasts,vendetta.plugin,vendetta.patcher,vendetta.metro,vendetta.api);
