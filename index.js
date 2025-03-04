(function(fe,it,z,W,j,D,at){"use strict";var ke={exports:{}},d={},Ie;function ct(){if(Ie)return d;Ie=1;var b=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),L=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),Z=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),$=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),G=Symbol.iterator;function x(n){return n===null||typeof n!="object"?null:(n=G&&n[G]||n["@@iterator"],typeof n=="function"?n:null)}var le={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},de=Object.assign,Q={};function Y(n,o,c){this.props=n,this.context=o,this.refs=Q,this.updater=c||le}Y.prototype.isReactComponent={},Y.prototype.setState=function(n,o){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,o,"setState")},Y.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function F(){}F.prototype=Y.prototype;function q(n,o,c){this.props=n,this.context=o,this.refs=Q,this.updater=c||le}var J=q.prototype=new F;J.constructor=q,de(J,Y.prototype),J.isPureReactComponent=!0;var pe=Array.isArray,E={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function oe(n,o,c,l,h,m){return c=m.ref,{$$typeof:b,type:n,key:o,ref:c!==void 0?c:null,props:m}}function ve(n,o){return oe(n.type,o,void 0,void 0,void 0,n.props)}function O(n){return typeof n=="object"&&n!==null&&n.$$typeof===b}function he(n){var o={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(c){return o[c]})}var ge=/\/+/g;function ue(n,o){return typeof n=="object"&&n!==null&&n.key!=null?he(""+n.key):o.toString(36)}function te(){}function ye(n){switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:switch(typeof n.status=="string"?n.then(te,te):(n.status="pending",n.then(function(o){n.status==="pending"&&(n.status="fulfilled",n.value=o)},function(o){n.status==="pending"&&(n.status="rejected",n.reason=o)})),n.status){case"fulfilled":return n.value;case"rejected":throw n.reason}}throw n}function B(n,o,c,l,h){var m=typeof n;(m==="undefined"||m==="boolean")&&(n=null);var p=!1;if(n===null)p=!0;else switch(m){case"bigint":case"string":case"number":p=!0;break;case"object":switch(n.$$typeof){case b:case f:p=!0;break;case A:return p=n._init,B(p(n._payload),o,c,l,h)}}if(p)return h=h(n),p=l===""?"."+ue(n,0):l,pe(h)?(c="",p!=null&&(c=p.replace(ge,"$&/")+"/"),B(h,o,c,"",function(se){return se})):h!=null&&(O(h)&&(h=ve(h,c+(h.key==null||n&&n.key===h.key?"":(""+h.key).replace(ge,"$&/")+"/")+p)),o.push(h)),1;p=0;var k=l===""?".":l+":";if(pe(n))for(var _=0;_<n.length;_++)l=n[_],m=k+ue(l,_),p+=B(l,o,c,m,h);else if(_=x(n),typeof _=="function")for(n=_.call(n),_=0;!(l=n.next()).done;)l=l.value,m=k+ue(l,_++),p+=B(l,o,c,m,h);else if(m==="object"){if(typeof n.then=="function")return B(ye(n),o,c,l,h);throw o=String(n),Error("Objects are not valid as a React child (found: "+(o==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":o)+"). If you meant to render a collection of children, use an array instead.")}return p}function S(n,o,c){if(n==null)return n;var l=[],h=0;return B(n,l,"","",function(m){return o.call(c,m,h++)}),l}function ne(n){if(n._status===-1){var o=n._result;o=o(),o.then(function(c){(n._status===0||n._status===-1)&&(n._status=1,n._result=c)},function(c){(n._status===0||n._status===-1)&&(n._status=2,n._result=c)}),n._status===-1&&(n._status=0,n._result=o)}if(n._status===1)return n._result.default;throw n._result}var Ee=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var o=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(o))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function R(){}return d.Children={map:S,forEach:function(n,o,c){S(n,function(){o.apply(this,arguments)},c)},count:function(n){var o=0;return S(n,function(){o++}),o},toArray:function(n){return S(n,function(o){return o})||[]},only:function(n){if(!O(n))throw Error("React.Children.only expected to receive a single React element child.");return n}},d.Component=Y,d.Fragment=U,d.Profiler=C,d.PureComponent=q,d.StrictMode=L,d.Suspense=K,d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=E,d.act=function(){throw Error("act(...) is not supported in production builds of React.")},d.cache=function(n){return function(){return n.apply(null,arguments)}},d.cloneElement=function(n,o,c){if(n==null)throw Error("The argument must be a React element, but you passed "+n+".");var l=de({},n.props),h=n.key,m=void 0;if(o!=null)for(p in o.ref!==void 0&&(m=void 0),o.key!==void 0&&(h=""+o.key),o)!ee.call(o,p)||p==="key"||p==="__self"||p==="__source"||p==="ref"&&o.ref===void 0||(l[p]=o[p]);var p=arguments.length-2;if(p===1)l.children=c;else if(1<p){for(var k=Array(p),_=0;_<p;_++)k[_]=arguments[_+2];l.children=k}return oe(n.type,h,void 0,void 0,m,l)},d.createContext=function(n){return n={$$typeof:Z,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider=n,n.Consumer={$$typeof:N,_context:n},n},d.createElement=function(n,o,c){var l,h={},m=null;if(o!=null)for(l in o.key!==void 0&&(m=""+o.key),o)ee.call(o,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(h[l]=o[l]);var p=arguments.length-2;if(p===1)h.children=c;else if(1<p){for(var k=Array(p),_=0;_<p;_++)k[_]=arguments[_+2];h.children=k}if(n&&n.defaultProps)for(l in p=n.defaultProps,p)h[l]===void 0&&(h[l]=p[l]);return oe(n,m,void 0,void 0,null,h)},d.createRef=function(){return{current:null}},d.forwardRef=function(n){return{$$typeof:P,render:n}},d.isValidElement=O,d.lazy=function(n){return{$$typeof:A,_payload:{_status:-1,_result:n},_init:ne}},d.memo=function(n,o){return{$$typeof:$,type:n,compare:o===void 0?null:o}},d.startTransition=function(n){var o=E.T,c={};E.T=c;try{var l=n(),h=E.S;h!==null&&h(c,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(R,Ee)}catch(m){Ee(m)}finally{E.T=o}},d.unstable_useCacheRefresh=function(){return E.H.useCacheRefresh()},d.use=function(n){return E.H.use(n)},d.useActionState=function(n,o,c){return E.H.useActionState(n,o,c)},d.useCallback=function(n,o){return E.H.useCallback(n,o)},d.useContext=function(n){return E.H.useContext(n)},d.useDebugValue=function(){},d.useDeferredValue=function(n,o){return E.H.useDeferredValue(n,o)},d.useEffect=function(n,o){return E.H.useEffect(n,o)},d.useId=function(){return E.H.useId()},d.useImperativeHandle=function(n,o,c){return E.H.useImperativeHandle(n,o,c)},d.useInsertionEffect=function(n,o){return E.H.useInsertionEffect(n,o)},d.useLayoutEffect=function(n,o){return E.H.useLayoutEffect(n,o)},d.useMemo=function(n,o){return E.H.useMemo(n,o)},d.useOptimistic=function(n,o){return E.H.useOptimistic(n,o)},d.useReducer=function(n,o,c){return E.H.useReducer(n,o,c)},d.useRef=function(n){return E.H.useRef(n)},d.useState=function(n){return E.H.useState(n)},d.useSyncExternalStore=function(n,o,c){return E.H.useSyncExternalStore(n,o,c)},d.useTransition=function(){return E.H.useTransition()},d.version="19.0.0",d}var re={exports:{}};re.exports;var We;function ft(){return We||(We=1,function(b,f){process.env.NODE_ENV!=="production"&&function(){function U(e,t){Object.defineProperty(N.prototype,e,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}function L(e){return e===null||typeof e!="object"?null:(e=Ge&&e[Ge]||e["@@iterator"],typeof e=="function"?e:null)}function C(e,t){e=(e=e.constructor)&&(e.displayName||e.name)||"ReactClass";var r=e+"."+t;qe[r]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,e),qe[r]=!0)}function N(e,t,r){this.props=e,this.context=t,this.refs=Me,this.updater=r||Be}function Z(){}function P(e,t,r){this.props=e,this.context=t,this.refs=Me,this.updater=r||Be}function K(e){return""+e}function $(e){try{K(e);var t=!1}catch{t=!0}if(t){t=console;var r=t.error,u=typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return r.call(t,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",u),K(e)}}function A(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===yt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _:return"Fragment";case k:return"Portal";case Ne:return"Profiler";case se:return"StrictMode";case we:return"Suspense";case $e:return"SuspenseList"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case Pe:return(e.displayName||"Context")+".Provider";case me:return(e._context.displayName||"Context")+".Consumer";case _e:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ie:return t=e.displayName||null,t!==null?t:A(e.type)||"Memo";case ae:t=e._payload,e=e._init;try{return A(e(t))}catch{}}return null}function G(e){return typeof e=="string"||typeof e=="function"||e===_||e===Ne||e===se||e===we||e===$e||e===gt||typeof e=="object"&&e!==null&&(e.$$typeof===ae||e.$$typeof===ie||e.$$typeof===Pe||e.$$typeof===me||e.$$typeof===_e||e.$$typeof===Et||e.getModuleId!==void 0)}function x(){}function le(){if(ce===0){ze=console.log,De=console.info,Ke=console.warn,xe=console.error,Qe=console.group,Xe=console.groupCollapsed,Ve=console.groupEnd;var e={configurable:!0,enumerable:!0,value:x,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}ce++}function de(){if(ce--,ce===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:H({},e,{value:ze}),info:H({},e,{value:De}),warn:H({},e,{value:Ke}),error:H({},e,{value:xe}),group:H({},e,{value:Qe}),groupCollapsed:H({},e,{value:Xe}),groupEnd:H({},e,{value:Ve})})}0>ce&&console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}function Q(e){if(Ue===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Ue=t&&t[1]||"",Ze=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ue+e+Ze}function Y(e,t){if(!e||Le)return"";var r=Ye.get(e);if(r!==void 0)return r;Le=!0,r=Error.prepareStackTrace,Error.prepareStackTrace=void 0;var u=null;u=v.H,v.H=null,le();try{var s={DetermineComponentFrameRoot:function(){try{if(t){var M=function(){throw Error()};if(Object.defineProperty(M.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(M,[])}catch(I){var Se=I}Reflect.construct(e,[],M)}else{try{M.call()}catch(I){Se=I}e.call(M.prototype)}}else{try{throw Error()}catch(I){Se=I}(M=e())&&typeof M.catch=="function"&&M.catch(function(){})}}catch(I){if(I&&Se&&typeof I.stack=="string")return[I.stack,Se.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=s.DetermineComponentFrameRoot(),y=i[0],g=i[1];if(y&&g){var w=y.split(`
`),T=g.split(`
`);for(i=a=0;a<w.length&&!w[a].includes("DetermineComponentFrameRoot");)a++;for(;i<T.length&&!T[i].includes("DetermineComponentFrameRoot");)i++;if(a===w.length||i===T.length)for(a=w.length-1,i=T.length-1;1<=a&&0<=i&&w[a]!==T[i];)i--;for(;1<=a&&0<=i;a--,i--)if(w[a]!==T[i]){if(a!==1||i!==1)do if(a--,i--,0>i||w[a]!==T[i]){var V=`
`+w[a].replace(" at new "," at ");return e.displayName&&V.includes("<anonymous>")&&(V=V.replace("<anonymous>",e.displayName)),typeof e=="function"&&Ye.set(e,V),V}while(1<=a&&0<=i);break}}}finally{Le=!1,v.H=u,de(),Error.prepareStackTrace=r}return w=(w=e?e.displayName||e.name:"")?Q(w):"",typeof e=="function"&&Ye.set(e,w),w}function F(e){if(e==null)return"";if(typeof e=="function"){var t=e.prototype;return Y(e,!(!t||!t.isReactComponent))}if(typeof e=="string")return Q(e);switch(e){case we:return Q("Suspense");case $e:return Q("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case _e:return e=Y(e.render,!1),e;case ie:return F(e.type);case ae:t=e._payload,e=e._init;try{return F(e(t))}catch{}}return""}function q(){var e=v.A;return e===null?null:e.getOwner()}function J(e){if(Te.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function pe(e,t){function r(){Fe||(Fe=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",t))}r.isReactWarning=!0,Object.defineProperty(e,"key",{get:r,configurable:!0})}function E(){var e=A(this.type);return et[e]||(et[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),e=this.props.ref,e!==void 0?e:null}function ee(e,t,r,u,s,a){return r=a.ref,e={$$typeof:p,type:e,key:t,props:a,_owner:s},(r!==void 0?r:null)!==null?Object.defineProperty(e,"ref",{enumerable:!1,get:E}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}function oe(e,t){return t=ee(e.type,t,void 0,void 0,e._owner,e.props),t._store.validated=e._store.validated,t}function ve(e,t){if(typeof e=="object"&&e&&e.$$typeof!==mt){if(be(e))for(var r=0;r<e.length;r++){var u=e[r];O(u)&&he(u,t)}else if(O(e))e._store&&(e._store.validated=1);else if(r=L(e),typeof r=="function"&&r!==e.entries&&(r=r.call(e),r!==e))for(;!(e=r.next()).done;)O(e.value)&&he(e.value,t)}}function O(e){return typeof e=="object"&&e!==null&&e.$$typeof===p}function he(e,t){if(e._store&&!e._store.validated&&e.key==null&&(e._store.validated=1,t=ge(t),!tt[t])){tt[t]=!0;var r="";e&&e._owner!=null&&e._owner!==q()&&(r=null,typeof e._owner.tag=="number"?r=A(e._owner.type):typeof e._owner.name=="string"&&(r=e._owner.name),r=" It was passed a child from "+r+".");var u=v.getCurrentStack;v.getCurrentStack=function(){var s=F(e.type);return u&&(s+=u()||""),s},console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',t,r),v.getCurrentStack=u}}function ge(e){var t="",r=q();return r&&(r=A(r.type))&&(t=`

Check the render method of \``+r+"`."),t||(e=A(e))&&(t=`

Check the top-level render call using <`+e+">."),t}function ue(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}function te(e,t){return typeof e=="object"&&e!==null&&e.key!=null?($(e.key),ue(""+e.key)):t.toString(36)}function ye(){}function B(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(ye,ye):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function S(e,t,r,u,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"bigint":case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case p:case k:i=!0;break;case ae:return i=e._init,S(i(e._payload),t,r,u,s)}}if(i){i=e,s=s(i);var y=u===""?"."+te(i,0):u;return be(s)?(r="",y!=null&&(r=y.replace(rt,"$&/")+"/"),S(s,t,r,"",function(w){return w})):s!=null&&(O(s)&&(s.key!=null&&(i&&i.key===s.key||$(s.key)),r=oe(s,r+(s.key==null||i&&i.key===s.key?"":(""+s.key).replace(rt,"$&/")+"/")+y),u!==""&&i!=null&&O(i)&&i.key==null&&i._store&&!i._store.validated&&(r._store.validated=2),s=r),t.push(s)),1}if(i=0,y=u===""?".":u+":",be(e))for(var g=0;g<e.length;g++)u=e[g],a=y+te(u,g),i+=S(u,t,r,a,s);else if(g=L(e),typeof g=="function")for(g===e.entries&&(nt||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),nt=!0),e=g.call(e),g=0;!(u=e.next()).done;)u=u.value,a=y+te(u,g++),i+=S(u,t,r,a,s);else if(a==="object"){if(typeof e.then=="function")return S(B(e),t,r,u,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return i}function ne(e,t,r){if(e==null)return e;var u=[],s=0;return S(e,u,"","",function(a){return t.call(r,a,s++)}),u}function Ee(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return t=e._result,t===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,t),"default"in t||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,t),t.default;throw e._result}function R(){var e=v.H;return e===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function n(){}function o(e){if(Ce===null)try{var t=("require"+Math.random()).slice(0,7);Ce=(b&&b[t]).call(b,"timers").setImmediate}catch{Ce=function(u){ut===!1&&(ut=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var s=new MessageChannel;s.port1.onmessage=u,s.port2.postMessage(void 0)}}return Ce(e)}function c(e){return 1<e.length&&typeof AggregateError=="function"?new AggregateError(e):e[0]}function l(e,t){t!==Ae-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),Ae=t}function h(e,t,r){var u=v.actQueue;if(u!==null)if(u.length!==0)try{m(u),o(function(){return h(e,t,r)});return}catch(s){v.thrownErrors.push(s)}else v.actQueue=null;0<v.thrownErrors.length?(u=c(v.thrownErrors),v.thrownErrors.length=0,r(u)):t(e)}function m(e){if(!He){He=!0;var t=0;try{for(;t<e.length;t++){var r=e[t];do{v.didUsePromise=!1;var u=r(!1);if(u!==null){if(v.didUsePromise){e[t]=r,e.splice(0,t);return}r=u}else break}while(1)}e.length=0}catch(s){e.splice(0,t+1),v.thrownErrors.push(s)}finally{He=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var p=Symbol.for("react.transitional.element"),k=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),se=Symbol.for("react.strict_mode"),Ne=Symbol.for("react.profiler"),me=Symbol.for("react.consumer"),Pe=Symbol.for("react.context"),_e=Symbol.for("react.forward_ref"),we=Symbol.for("react.suspense"),$e=Symbol.for("react.suspense_list"),ie=Symbol.for("react.memo"),ae=Symbol.for("react.lazy"),gt=Symbol.for("react.offscreen"),Ge=Symbol.iterator,qe={},Be={isMounted:function(){return!1},enqueueForceUpdate:function(e){C(e,"forceUpdate")},enqueueReplaceState:function(e){C(e,"replaceState")},enqueueSetState:function(e){C(e,"setState")}},H=Object.assign,Me={};Object.freeze(Me),N.prototype.isReactComponent={},N.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},N.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var X={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Re;for(Re in X)X.hasOwnProperty(Re)&&U(Re,X[Re]);Z.prototype=N.prototype,X=P.prototype=new Z,X.constructor=P,H(X,N.prototype),X.isPureReactComponent=!0;var be=Array.isArray,yt=Symbol.for("react.client.reference"),v={H:null,A:null,T:null,S:null,actQueue:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null},Te=Object.prototype.hasOwnProperty,Et=Symbol.for("react.client.reference"),ce=0,ze,De,Ke,xe,Qe,Xe,Ve;x.__reactDisabledLog=!0;var Ue,Ze,Le=!1,Ye=new(typeof WeakMap=="function"?WeakMap:Map),mt=Symbol.for("react.client.reference"),Fe,Je,et={},tt={},nt=!1,rt=/\/+/g,ot=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ut=!1,Ce=null,Ae=0,Oe=!1,He=!1,st=typeof queueMicrotask=="function"?function(e){queueMicrotask(function(){return queueMicrotask(e)})}:o;f.Children={map:ne,forEach:function(e,t,r){ne(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return ne(e,function(){t++}),t},toArray:function(e){return ne(e,function(t){return t})||[]},only:function(e){if(!O(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},f.Component=N,f.Fragment=_,f.Profiler=Ne,f.PureComponent=P,f.StrictMode=se,f.Suspense=we,f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=v,f.act=function(e){var t=v.actQueue,r=Ae;Ae++;var u=v.actQueue=t!==null?t:[],s=!1;try{var a=e()}catch(g){v.thrownErrors.push(g)}if(0<v.thrownErrors.length)throw l(t,r),e=c(v.thrownErrors),v.thrownErrors.length=0,e;if(a!==null&&typeof a=="object"&&typeof a.then=="function"){var i=a;return st(function(){s||Oe||(Oe=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(g,w){s=!0,i.then(function(T){if(l(t,r),r===0){try{m(u),o(function(){return h(T,g,w)})}catch(M){v.thrownErrors.push(M)}if(0<v.thrownErrors.length){var V=c(v.thrownErrors);v.thrownErrors.length=0,w(V)}}else g(T)},function(T){l(t,r),0<v.thrownErrors.length&&(T=c(v.thrownErrors),v.thrownErrors.length=0),w(T)})}}}var y=a;if(l(t,r),r===0&&(m(u),u.length!==0&&st(function(){s||Oe||(Oe=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),v.actQueue=null),0<v.thrownErrors.length)throw e=c(v.thrownErrors),v.thrownErrors.length=0,e;return{then:function(g,w){s=!0,r===0?(v.actQueue=u,o(function(){return h(y,g,w)})):g(y)}}},f.cache=function(e){return function(){return e.apply(null,arguments)}},f.cloneElement=function(e,t,r){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var u=H({},e.props),s=e.key,a=e._owner;if(t!=null){var i;e:{if(Te.call(t,"ref")&&(i=Object.getOwnPropertyDescriptor(t,"ref").get)&&i.isReactWarning){i=!1;break e}i=t.ref!==void 0}i&&(a=q()),J(t)&&($(t.key),s=""+t.key);for(y in t)!Te.call(t,y)||y==="key"||y==="__self"||y==="__source"||y==="ref"&&t.ref===void 0||(u[y]=t[y])}var y=arguments.length-2;if(y===1)u.children=r;else if(1<y){i=Array(y);for(var g=0;g<y;g++)i[g]=arguments[g+2];u.children=i}for(u=ee(e.type,s,void 0,void 0,a,u),s=2;s<arguments.length;s++)ve(arguments[s],u.type);return u},f.createContext=function(e){return e={$$typeof:Pe,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:me,_context:e},e._currentRenderer=null,e._currentRenderer2=null,e},f.createElement=function(e,t,r){if(G(e))for(var u=2;u<arguments.length;u++)ve(arguments[u],e);else{if(u="",(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(u+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."),e===null)var s="null";else be(e)?s="array":e!==void 0&&e.$$typeof===p?(s="<"+(A(e.type)||"Unknown")+" />",u=" Did you accidentally export a JSX literal instead of a component?"):s=typeof e;console.error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",s,u)}var a;if(u={},s=null,t!=null)for(a in Je||!("__self"in t)||"key"in t||(Je=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),J(t)&&($(t.key),s=""+t.key),t)Te.call(t,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(u[a]=t[a]);var i=arguments.length-2;if(i===1)u.children=r;else if(1<i){for(var y=Array(i),g=0;g<i;g++)y[g]=arguments[g+2];Object.freeze&&Object.freeze(y),u.children=y}if(e&&e.defaultProps)for(a in i=e.defaultProps,i)u[a]===void 0&&(u[a]=i[a]);return s&&pe(u,typeof e=="function"?e.displayName||e.name||"Unknown":e),ee(e,s,void 0,void 0,q(),u)},f.createRef=function(){var e={current:null};return Object.seal(e),e},f.forwardRef=function(e){e!=null&&e.$$typeof===ie?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?console.error("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&e.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var t={$$typeof:_e,render:e},r;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return r},set:function(u){r=u,e.name||e.displayName||(Object.defineProperty(e,"name",{value:u}),e.displayName=u)}}),t},f.isValidElement=O,f.lazy=function(e){return{$$typeof:ae,_payload:{_status:-1,_result:e},_init:Ee}},f.memo=function(e,t){G(e)||console.error("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e),t={$$typeof:ie,type:e,compare:t===void 0?null:t};var r;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return r},set:function(u){r=u,e.name||e.displayName||(Object.defineProperty(e,"name",{value:u}),e.displayName=u)}}),t},f.startTransition=function(e){var t=v.T,r={};v.T=r,r._updatedFibers=new Set;try{var u=e(),s=v.S;s!==null&&s(r,u),typeof u=="object"&&u!==null&&typeof u.then=="function"&&u.then(n,ot)}catch(a){ot(a)}finally{t===null&&r._updatedFibers&&(e=r._updatedFibers.size,r._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),v.T=t}},f.unstable_useCacheRefresh=function(){return R().useCacheRefresh()},f.use=function(e){return R().use(e)},f.useActionState=function(e,t,r){return R().useActionState(e,t,r)},f.useCallback=function(e,t){return R().useCallback(e,t)},f.useContext=function(e){var t=R();return e.$$typeof===me&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),t.useContext(e)},f.useDebugValue=function(e,t){return R().useDebugValue(e,t)},f.useDeferredValue=function(e,t){return R().useDeferredValue(e,t)},f.useEffect=function(e,t){return R().useEffect(e,t)},f.useId=function(){return R().useId()},f.useImperativeHandle=function(e,t,r){return R().useImperativeHandle(e,t,r)},f.useInsertionEffect=function(e,t){return R().useInsertionEffect(e,t)},f.useLayoutEffect=function(e,t){return R().useLayoutEffect(e,t)},f.useMemo=function(e,t){return R().useMemo(e,t)},f.useOptimistic=function(e,t){return R().useOptimistic(e,t)},f.useReducer=function(e,t,r){return R().useReducer(e,t,r)},f.useRef=function(e){return R().useRef(e)},f.useState=function(e){return R().useState(e)},f.useSyncExternalStore=function(e,t,r){return R().useSyncExternalStore(e,t,r)},f.useTransition=function(){return R().useTransition()},f.version="19.0.0",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}(re,re.exports)),re.exports}process.env.NODE_ENV==="production"?ke.exports=ct():ke.exports=ft();var lt=ke.exports;const dt=function(){D.storage.enableReadAll===void 0&&(D.storage.enableReadAll=!0);const[b,f]=lt.useState(D.storage.enableReadAll),U=function(){const L=!b;f(L),D.storage.enableReadAll=L};return React.createElement(W.View,{style:{padding:20}},React.createElement(W.Text,{style:{fontSize:16,fontWeight:"bold",marginBottom:10}},'Enable "Read All" Button'),React.createElement(at.Switch,{value:b,onValueChange:U}))};let je;const pt=function(){try{console.log("[Read All] Searching for message-related functions...");const b=z.findByProps("ack")||z.findByProps("ackMessage")||z.findByProps("markRead"),f=b?.ack??b?.ackMessage??b?.markRead;if(!f){console.error("[Read All] No valid message acknowledgment function found."),j.showToast("Error: No valid message acknowledgment function found.",{type:"danger"});return}const U=z.findByProps("Guilds","GuildsList");if(!U||!U.Guilds){console.error("[Read All] Server list UI missing."),j.showToast("Error: Server list UI missing!",{type:"danger"});return}if(!z.findByProps("getGuilds","getGuildCount")){console.error("[Read All] Server List component not found."),j.showToast("Error: Server List component not found!",{type:"danger"});return}D.storage.enableReadAll===void 0&&(D.storage.enableReadAll=!0),je=it.after("Guilds",U,function(L,C){let[N]=L;if(!C?.props?.children||!D.storage.enableReadAll)return C;if(!C.props.children||!Array.isArray(C.props.children))return console.error("[Read All] Server list UI is missing from props."),C;const Z=W.React.createElement(W.ReactNative.View,{style:{padding:10,alignItems:"center"}},W.React.createElement(W.ReactNative.TouchableOpacity,{onPress:function(){try{console.log("[Read All] Marking all messages as read...");const P=z.findByStoreName("GuildStore");if(!P){console.error("[Read All] GuildStore not found."),j.showToast("Error: Guilds not found!",{type:"danger"});return}const K=P.getGuilds();if(!K){console.error("[Read All] No guilds found."),j.showToast("Error: No guilds found!",{type:"danger"});return}Object.values(K).forEach(function($){console.log(`[Read All] Processing guild: ${$.id}`);const A=z.findByStoreName("ChannelStore");if(!A){console.error("[Read All] ChannelStore not found.");return}const G=A.getChannels($.id);if(!G){console.error(`[Read All] No channels found for guild ${$.id}`);return}Object.values(G).forEach(function(x){x.is_read||f(x.id)})}),j.showToast("All messages marked as read!",{type:"success"})}catch(P){console.error("[Read All] Error marking messages as read:",P),j.showToast("Error marking messages as read.",{type:"danger"})}},style:{padding:10,backgroundColor:"#5865F2",borderRadius:8,alignItems:"center",width:"90%"}},W.React.createElement(W.ReactNative.Text,{style:{color:"#FFFFFF",fontWeight:"bold"}},"\u{1F4E9} Read All Messages")));return C.props.children.unshift(Z),C}),console.log("[Read All] Plugin loaded successfully.")}catch(b){console.error("[Read All] Plugin Load Error:",b),j.showToast("Plugin Load Failed!",{type:"danger"})}},vt=function(){try{je&&(je(),j.showToast("Plugin Successfully Unloaded!",{type:"success"}))}catch(b){console.error("[Read All] Unload Error:",b),j.showToast("Error during Unload!",{type:"danger"})}},ht=dt;return fe.onLoad=pt,fe.onUnload=vt,fe.settings=ht,fe})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin,vendetta.ui.components);
