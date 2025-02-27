(function(c,t,o,a,d,u){"use strict";const{FormSwitch:f}=u.Forms;function h(){return t.React.createElement(f,{label:"Mark DMs as Read",value:a.storage.markDMs,onValueChange:function(e){return a.storage.markDMs=e}})}const{View:g,TouchableOpacity:R,Text:k,StyleSheet:v}=t.ReactNative;a.storage.markDMs===void 0&&(a.storage.markDMs=!0);const r=o.findByProps("ack","markChannelRead"),m=o.findByProps("getGuilds"),B=o.findByProps("getSortedPrivateChannels");(!r||!r.markChannelRead)&&console.error("[ReadAll] Missing `markChannelRead` method!");const C=function(){if(!r?.markChannelRead)return;const e=m?.getGuilds();if(e&&Object.keys(e).forEach(function(n){r.markChannelRead(n)}),a.storage.markDMs){const n=B?.getSortedPrivateChannels();n&&n.forEach(function(s){r.markChannelRead(s.channel.id)})}};let l=null;const y=function(){const e=o.findByProps("NavBar","topBar","title");if(!e)return console.error("[ReadAll] Failed to find Navigation Bar!"),null;const n=function(){return t.React.createElement(R,{style:i.button,onPress:C},t.React.createElement(k,{style:i.text},"\u2714 Read All"))},s=e.NavBar;function M(E){const N=s(E);return t.React.createElement(g,{style:{flexDirection:"row",alignItems:"center"}},N,t.React.createElement(n,null))}return e.NavBar=M,function(){e.NavBar=s}},b=function(){d.registerSettings("read-all-settings",h),l=y()},D=function(){l&&l()},i=v.create({button:{padding:8,marginLeft:10,backgroundColor:"#7289DA",borderRadius:5},text:{color:"white",fontWeight:"bold"}});return c.onLoad=b,c.onUnload=D,c})({},vendetta.metro.common,vendetta.metro,vendetta.plugin,vendetta.settings,vendetta.ui.components);
