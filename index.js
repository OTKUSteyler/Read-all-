(function(l,f,r,a,t,n){"use strict";const R=function(){const[e,d]=a.React.useState(n.storage.enableReadAll??!0),o=function(){n.storage.enableReadAll=!e,d(!e)};return a.React.createElement(a.ReactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},a.React.createElement(a.ReactNative.Text,{style:{fontSize:16,fontWeight:"bold",marginBottom:10}},"Enable Read All Messages"),a.React.createElement(a.ReactNative.Switch,{value:e,onValueChange:o}))};let u;const h=function(){try{const e=r.findByProps("ack","ackMessage","messages","markRead","channelActions");console.log("[Read All] ChannelActions object:",e);const d=r.findByProps("ack","ackMessage","messages","markRead","channelActions");if(console.log("[Read All] All available actions related to message ack:",d),!d){console.error("[Read All] Failed to find any message actions."),t.showToast("Error: Failed to find any message actions.",{type:"danger"});return}if(!e?.ack){console.error("[Read All] 'ack' method not found in ChannelActions."),t.showToast("Error: Could not find 'ack' method.",{type:"danger"});return}const o=r.findByProps("Guilds","GuildsList");if(!o?.Guilds){console.error("[Read All] 'Guilds' component not found in GuildsComponent:",o),t.showToast("Failed to find the server list UI.",{type:"danger"});return}n.storage.enableReadAll===void 0&&(n.storage.enableReadAll=!0),u=f.after("Guilds",o,function(k,c){let[b]=k;if(!c?.props?.children||!n.storage.enableReadAll)return c;const m=a.React.createElement(a.ReactNative.TouchableOpacity,{onPress:function(){try{const i=r.findByProps("getGuilds")?.getGuilds?.();if(!i){console.error("[Read All] No guilds found.");return}Object.values(i).forEach(function(E){const g=E.channels;g&&Object.values(g).forEach(function(s){s.is_read||(console.log(`[Read All] Marking channel ${s.id} as read.`),e?.ack?e.ack(s.id):e?.ackMessage?e.ackMessage(s.id):e?.markRead?e.markRead(s.id):(console.error("[Read All] No suitable method found to mark message as read."),t.showToast("Error: Could not find method to mark messages as read.",{type:"danger"})))})}),t.showToast("All messages marked as read!",{type:"success"})}catch(i){console.error("[Read All] Error marking messages as read:",i),t.showToast("Error marking messages as read.",{type:"danger"})}},style:{marginBottom:10,padding:10,backgroundColor:"#5865F2",borderRadius:8,alignItems:"center"}},a.React.createElement(a.ReactNative.Text,{style:{color:"#FFFFFF",fontWeight:"bold"}},"\u{1F4E9} Read All"));return c.props.children.unshift(m),c}),console.log("[Read All] Plugin loaded successfully.")}catch(e){console.error("[Read All] Plugin Load Error:",e),t.showToast("Plugin Load Failed!",{type:"danger"})}},y=function(){try{u&&(u(),t.showToast("Plugin Successfully Unloaded!",{type:"success"}))}catch(e){console.error("[Read All] Unload Error:",e),t.showToast("Error during Unload!",{type:"danger"})}},A=R;return l.onLoad=h,l.onUnload=y,l.settings=A,l})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin);
