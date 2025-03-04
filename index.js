(function(t,d,l,r,i){"use strict";function u(){const e=l.findByProps("ack","ackMessage");if(!e){console.error("[ReadAll] ERROR: ReadStateStore not found!");return}Object.keys(e.getUnreadCount()).forEach(function(o){e.ack(o)}),console.log("[ReadAll] Marked all messages as read.")}function a(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1;console.log(`[ReadAll] Searching for Sidebar Container... (Attempt ${e})`);let o=l.findByProps("guilds","base")||l.findByProps("navWrapper");return o?(console.log("[ReadAll] Sidebar Wrapper found! Injecting button..."),c(o),o):e>=10?(console.error("[ReadAll] ERROR: Sidebar wrapper not found. Aborting."),null):setTimeout(function(){return a(e+1)},500)}function c(e){d.after("default",e,function(o,n){return n?n.props.children.find(function(f){return f?.props?.id==="readall-button"})?(console.log("[ReadAll] Button already exists. Skipping re-injection."),n):(n.props.children=[r.React.createElement("div",{id:"readall-button",style:{padding:10,marginBottom:10}},r.React.createElement(i.Button,{onClick:u,style:{width:"100%"}},"\u2705 Read All")),...n.props.children],n):(console.error("[ReadAll] ERROR: SidebarWrapper returned empty."),n)}),console.log("[ReadAll] Button injected successfully.")}var s={onLoad:function(){console.log("[ReadAll] Plugin loaded! Waiting for UI..."),setTimeout(function(){return a()},2e3)},onUnload:function(){console.log("[ReadAll] Plugin unloaded!")}};return t.default=s,Object.defineProperty(t,"__esModule",{value:!0}),t})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.components);
