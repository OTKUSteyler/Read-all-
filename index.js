(function(l,e,n,o,u,f,r){"use strict";const{FormSwitch:g}=u.Forms;function h(){return e.React.createElement(g,{label:"Mark DMs as Read",value:n.storage.includeDMs,onValueChange:function(a){return n.storage.includeDMs=a}})}const{markRead:c}=r.findByProps("markRead"),{getGuilds:R}=r.findByProps("getGuilds"),{getSortedPrivateChannels:k}=r.findByProps("getSortedPrivateChannels");n.storage.includeDMs??=!0;let s=[];const v=function(){o.registerSettings("mark-all-read-settings",h);const a=function(){const d=function(){Object.keys(R()).forEach(function(t){return c(t)}),n.storage.includeDMs&&k().forEach(function(t){return c(t.channel.id)}),e.ReactNative.Alert.alert("Success","All messages marked as read!")};return e.React.createElement(e.ReactNative.TouchableOpacity,{style:{position:"absolute",top:40,left:10,backgroundColor:"#7289DA",padding:10,borderRadius:5,zIndex:999},onPress:d},e.React.createElement(e.ReactNative.Text,{style:{color:"white",fontWeight:"bold"}},"Mark All Read"))},i=r.findByProps("DrawerNavigator")?.default;i&&s.push(before("default",i,function(d){let[t]=d;t?.children&&(t.children=e.React.createElement(e.React.Fragment,null,e.React.createElement(a,null),t.children))})),s.push(f.registerCommand({name:"markallread",displayName:"Mark All Read",description:"Marks all messages as read.",execute:function(){return markAllAsRead(),{content:"All messages marked as read!"}}}))},m=function(){s.forEach(function(a){return a()}),s=[]};return l.onLoad=v,l.onUnload=m,l})({},vendetta.metro.common,vendetta.plugin,vendetta.settings,vendetta.ui.components,vendetta.commands,vendetta.metro);
