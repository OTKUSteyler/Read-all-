(function(o,c,l,r,i){"use strict";function u(){const e=l.findByProps("ack","ackMessage");if(!e){console.error("[ReadAll] ERROR: ReadStateStore not found!");return}Object.keys(e.getUnreadCount()).forEach(function(a){e.ack(a)}),console.log("[ReadAll] Marked all messages as read.")}function d(){console.log("[ReadAll] Injecting button...");const e=l.findByProps("guilds","wrapper");if(!e){console.error("[ReadAll] ERROR: Sidebar component not found!");return}c.after("default",e,function(a,n){return n?n.props.children.find(function(f){return f?.props?.id==="readall-button"})?(console.log("[ReadAll] Button already exists. Skipping re-injection."),n):(console.log("[ReadAll] Injecting button into sidebar..."),n.props.children=[r.React.createElement("div",{id:"readall-button",style:{padding:10,marginBottom:10}},r.React.createElement(i.Button,{onClick:u,style:{width:"100%"}},"\u2705 Read All")),...n.props.children],n):(console.error("[ReadAll] ERROR: Sidebar component returned empty."),n)}),console.log("[ReadAll] Button injected successfully.")}let t=null;function s(){const e=document.querySelector('[class*="guilds"]');if(!e){console.error("[ReadAll] ERROR: Sidebar element not found!");return}t=new MutationObserver(function(){console.log("[ReadAll] Sidebar updated! Checking for button..."),d()}),t.observe(e,{childList:!0,subtree:!0})}var R={onLoad:function(){console.log("[ReadAll] Plugin loaded! Waiting for UI..."),d(),s()},onUnload:function(){console.log("[ReadAll] Plugin unloaded!"),t&&t.disconnect()}};return o.default=R,Object.defineProperty(o,"__esModule",{value:!0}),o})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.components);
