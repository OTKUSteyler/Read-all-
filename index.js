(function(l,g,s,e,a,t,i){"use strict";function f(){return e.React.createElement(i.General.SettingsSection,{title:"Read All Messages"},e.React.createElement(i.General.SettingsSwitch,{title:"Enable 'Read All Messages' Button",value:t.storage.enableReadAll,onValueChange:function(n){t.storage.enableReadAll=n}}))}let d;const R=function(){try{a.showToast("Loading Read All Messages Plugin...",{type:"info"});const n=s.findByProps("ack","ackMessage");if(!n){a.showToast("Failed to find Discord functions.",{type:"danger"});return}const c=s.findByProps("Guilds","GuildsList");if(!c?.Guilds){a.showToast("Failed to find the server list UI.",{type:"danger"});return}t.storage.enableReadAll===void 0&&(t.storage.enableReadAll=!0),d=g.after("Guilds",c,function(b,o){let[v]=b;return!o?.props?.children||!t.storage.enableReadAll||o.props.children.unshift(e.React.createElement(e.ReactNative.View,{style:{padding:10}},e.React.createElement(e.ReactNative.TouchableOpacity,{style:{backgroundColor:t.storage.enableReadAll?"#5865F2":"#888888",padding:10,borderRadius:5,alignItems:"center"},disabled:!t.storage.enableReadAll,onPress:function(){try{const r=s.findByProps("getMutableGuilds")?.getMutableGuilds?.();if(!r)return;Object.keys(r).forEach(function(A){const u=r[A]?.channels?.find?.(function(E){return!E.is_read})?.id;u&&n.ack(u)}),a.showToast("\u2705 All messages marked as read!",{type:"success"})}catch(r){console.error("[Read All] Error:",r),a.showToast("\u274C Error marking messages as read.",{type:"danger"})}}},e.React.createElement(e.ReactNative.Text,{style:{color:"#FFFFFF"}},t.storage.enableReadAll?"\u{1F4E9} Read All Messages":"\u274C Disabled")))),o})}catch(n){console.error("[Read All] Plugin Load Error:",n),a.showToast("\u274C Plugin Load Failed!",{type:"danger"})}},h=function(){try{d&&(d(),a.showToast("\u2705 Plugin Successfully Unloaded!",{type:"success"}))}catch(n){console.error("[Read All] Unload Error:",n),a.showToast("\u274C Error during Unload!",{type:"danger"})}},y=f;return l.onLoad=R,l.onUnload=h,l.settings=y,l})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin,vendetta.ui.components);
