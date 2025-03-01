(function(s,g,i,e,a,n){"use strict";const f=function(){const[t,l]=e.React.useState(n.storage.enableReadAll??!0),d=function(){n.storage.enableReadAll=!t,l(!t)};return e.React.createElement(e.ReactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},e.React.createElement(e.ReactNative.Text,{style:{fontSize:16,fontWeight:"bold",marginBottom:10}},"Enable Read All Messages"),e.React.createElement(e.ReactNative.Switch,{value:t,onValueChange:d}))};let o;const h=function(){try{a.showToast("Loading Read All Messages Plugin...",{type:"info"});const t=i.findByProps("ack","ackMessage");if(!t||!t.ack){a.showToast("Failed to find Discord message functions.",{type:"danger"}),console.error("[Read All] Missing ack function in ChannelActions:",t);return}const l=i.findByProps("Guilds","GuildsList");if(!l?.Guilds){a.showToast("Failed to find the server list UI.",{type:"danger"});return}n.storage.enableReadAll===void 0&&(n.storage.enableReadAll=!0),o=g.after("Guilds",l,function(d,c){let[A]=d;return!c?.props?.children||!n.storage.enableReadAll||c.props.children.unshift(e.React.createElement(e.ReactNative.View,{style:{position:"absolute",bottom:20,right:20,backgroundColor:"#5865F2",padding:12,borderRadius:8,elevation:5,alignItems:"center"}},e.React.createElement(e.ReactNative.TouchableOpacity,{onPress:function(){try{const r=i.findByProps("getMutableGuilds")?.getMutableGuilds?.();if(!r)return;Object.keys(r).forEach(function(b){const u=r[b]?.channels?.find?.(function(v){return!v.is_read});u?.id&&t.ack(u.id)}),a.showToast("All messages marked as read!",{type:"success"})}catch(r){console.error("[Read All] Error marking messages:",r),a.showToast("Error marking messages as read.",{type:"danger"})}}},e.React.createElement(e.ReactNative.Text,{style:{color:"#FFFFFF",fontWeight:"bold"}},"\u{1F4E9} Read All")))),c})}catch(t){console.error("[Read All] Plugin Load Error:",t),a.showToast("Plugin Load Failed!",{type:"danger"})}},R=function(){try{o&&(o(),a.showToast("Plugin Successfully Unloaded!",{type:"success"}))}catch(t){console.error("[Read All] Unload Error:",t),a.showToast("Error during Unload!",{type:"danger"})}},y=f;return s.onLoad=h,s.onUnload=R,s.settings=y,s})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin);
