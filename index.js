(function(l,g,s,e,t,n,d){"use strict";function f(){return e.React.createElement(d.Forms.FormSection,{title:"Read All Messages Plugin"},e.React.createElement(d.Forms.FormSwitchRow,{label:"Enable 'Read All Messages' Overlay Button",value:n.storage.enableReadAll,onValueChange:function(a){n.storage.enableReadAll=a}}))}let o;const y=function(){try{t.showToast("\u{1F4E5} Loading Read All Messages Plugin...",{type:"info"});const a=s.findByProps("ack","ackMessage");if(!a){t.showToast("\u274C Failed to find Discord functions.",{type:"danger"});return}n.storage.enableReadAll===void 0&&(n.storage.enableReadAll=!0);const i=s.findByProps("isOpen","pushLayer");if(!i){t.showToast("\u274C Failed to find overlay UI.",{type:"danger"});return}o=g.after("pushLayer",i,function(F,c){let[v]=F;return n.storage.enableReadAll?e.React.createElement(e.React.Fragment,null,c,e.React.createElement(e.ReactNative.View,{style:{position:"absolute",bottom:20,left:"50%",transform:[{translateX:-75}],backgroundColor:"#5865F2",padding:15,borderRadius:25,alignItems:"center",width:150,elevation:5}},e.React.createElement(e.ReactNative.TouchableOpacity,{onPress:function(){try{const r=s.findByProps("getMutableGuilds")?.getMutableGuilds?.();if(!r)return;Object.keys(r).forEach(function(b){const u=r[b]?.channels?.find?.(function(E){return!E.is_read})?.id;u&&a.ack(u)}),t.showToast("\u2705 All messages marked as read!",{type:"success"})}catch(r){console.error("[Read All] Error:",r),t.showToast("\u274C Error marking messages as read.",{type:"danger"})}}},e.React.createElement(e.ReactNative.Text,{style:{color:"#FFFFFF",fontWeight:"bold",textAlign:"center"}},"\u{1F4E9} Read All Messages")))):c})}catch(a){console.error("[Read All] Plugin Load Error:",a),t.showToast("\u274C Plugin Load Failed!",{type:"danger"})}},R=function(){try{o&&(o(),t.showToast("\u2705 Plugin Successfully Unloaded!",{type:"success"}))}catch(a){console.error("[Read All] Unload Error:",a),t.showToast("\u274C Error during Unload!",{type:"danger"})}},h=f;return l.onLoad=y,l.onUnload=R,l.settings=h,l})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin,vendetta.ui.components);
