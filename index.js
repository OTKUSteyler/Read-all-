(function(n,s,a,l,d){"use strict";const t=a.findByProps("ack","ackMessage"),r=a.findByProps("OverlayButton");function c(){if(!t){console.error("[ReadAll] \u274C ERROR: ReadStateStore not found!"),l.showToast("\u274C Error: Read state not found",{type:"error"});return}Object.keys(t.getUnreadCount()).forEach(function(e){t.ack(e)}),console.log("[ReadAll] \u2705 Marked all messages as read."),l.showToast("\u2705 All messages marked as read!",{type:"success"})}function u(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:10;if(!r){if(e<=0){console.error("[ReadAll] \u274C ERROR: Overlay button component still not found. Aborting.");return}console.log(`[ReadAll] \u{1F504} Overlay button not found, retrying... (${10-e}/10)`),setTimeout(function(){return u(e-1)},500);return}s.after("default",r,function(f,o){return!o||!o.props||!Array.isArray(o.props.children)||(o.props.children.push(d.React.createElement(r.OverlayButton,{key:"markAllRead",icon:"CheckCircle",onPress:c,tooltip:"Mark All as Read"})),console.log("[ReadAll] \u2705 Overlay button added!")),o})}var i={onLoad:function(){console.log("[ReadAll] \u{1F680} Plugin loaded! Searching for UI..."),u()},onUnload:function(){console.log("[ReadAll] \u{1F6D1} Plugin unloaded!")}};return n.default=i,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.patcher,vendetta.metro,vendetta.ui.toasts,vendetta.metro.common);
