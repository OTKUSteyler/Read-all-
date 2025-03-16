(function(p,n,w,r,u,l,c,E){"use strict";const{FormRow:h,FormSection:B,FormDivider:T,FormText:b}=E.Forms,I=function(e,i){typeof l.showToast=="function"&&(l.showToast.length>=2?l.showToast(e,{type:i}):l.showToast(e))};function P(){const[,e]=n.React.useReducer(function(a){return a+1},0),i=function(){c.storage.unreadGuildsCount=0,I("Statistics reset","success"),e()};return n.React.createElement(n.React.Fragment,null,n.React.createElement(B,{title:"Statistics"},n.React.createElement(h,{label:"Total unread guilds marked as read",trailing:c.storage.unreadGuildsCount||0}),n.React.createElement(h,{label:"Reset Statistics",subLabel:"Clear the counter for marked guilds",leading:n.React.createElement(h.Icon,{source:u.getAssetIDByName("ic_refresh_24px")}),onPress:i})),n.React.createElement(T,null),n.React.createElement(B,{title:"Information"},n.React.createElement(b,null,"The Read-all plugin adds a button to the bottom tab bar that allows you to mark all servers and DMs as read with a single tap."),n.React.createElement(b,{style:{marginTop:8}},"If you don't see the button, please try restarting Discord.")))}c.storage.unreadGuildsCount??=0;const A=r.findByProps("getGuilds","getGuild"),C=r.findByProps("getChannel","getMutablePrivateChannels"),m=r.findByProps("getUnreadCount","hasUnread"),G=r.findByProps("markGuildAsRead","markChannelAsRead"),v=r.findByProps("GuildList")?.GuildList||r.findByName("GuildList");r.findByProps("GuildIcon")?.GuildIcon||r.findByName("GuildIcon"),r.findByProps("HomeButton")?.HomeButton||r.findByName("HomeButton");const L=r.findByProps("GuildListDivider")?.GuildListDivider||r.findByName("GuildListDivider");let y=null,g=!0;function F(){try{const e=[],i=Object.values(A.getGuilds());for(const t of i)m.hasUnread(t.id)&&(e.push(t.id),G.markGuildAsRead(t.id));const a=Object.values(C.getMutablePrivateChannels());for(const t of a)m.hasUnread(t.id)&&G.markChannelAsRead(t.id);c.storage.unreadGuildsCount=(c.storage.unreadGuildsCount||0)+e.length,g&&(l.showToast(`Marked ${e.length} guilds as read`,d("success")),g=!1,setTimeout(function(){return g=!0},2e3))}catch(e){console.error("Error in markAllAsRead:",e),l.showToast("Failed to mark all as read",d("error"))}}function d(e){try{return typeof l.showToast=="function"?l.showToast.length>=2?{type:e}:{content:e}:{}}catch{return{}}}const k=function(e){const i={container:{width:48,height:48,borderRadius:24,backgroundColor:"#5865F2",marginBottom:8,marginTop:8,marginLeft:"auto",marginRight:"auto",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},icon:{width:24,height:24,color:"#FFFFFF"}},a=u.getAssetIDByName("ic_done_all_24px")||u.getAssetIDByName("ic_check_24px")||u.getAssetIDByName("debug")||u.getAssetIDByName("ic_message_check"),t=r.findByName("Pressable")||r.findByProps("Pressable")?.Pressable||function(f){return n.React.createElement("button",f)},o=r.findByName("Icon")||r.findByProps("Icon")?.Icon;return n.React.createElement(t,{style:i.container,onPress:F,accessibilityLabel:"Mark all as read"},o?n.React.createElement(o,{source:a,style:i.icon}):null)};var N={onLoad:function(){try{v?(y=w.after("default",v,function(e,i){try{const a=R(i,function(t){return Array.isArray(t?.props?.children)&&t.props.children.some(function(o){return o?.type?.name==="HomeButton"||o?.type?.displayName==="HomeButton"})});if(a?.props?.children&&!a.props.children.some(function(t){return t?.key==="read-all-button"||t?.props?.accessibilityLabel==="Mark all as read"})){const t=a.props.children.findIndex(function(s){return s?.type?.name==="HomeButton"||s?.type?.displayName==="HomeButton"}),o=a.props.children.findIndex(function(s){return s?.type?.name==="GuildListDivider"||s?.type?.displayName==="GuildListDivider"}),f=Math.max(t,o)+1;if(f>0){const s=n.React.createElement(k,{key:"read-all-button"}),D=n.React.createElement(L||"div",{key:"read-all-divider",style:{marginTop:8,marginBottom:8}});a.props.children.splice(f,0,D,s)}else a.props.children.unshift(n.React.createElement(k,{key:"read-all-button"}))}}catch(a){console.error("Error patching GuildList:",a)}return i}),console.log("Successfully patched GuildList"),l.showToast("Read-all plugin loaded",d("success"))):(console.error("Could not find GuildList component to patch"),l.showToast("Read-all plugin may not work correctly",d("warning")))}catch(e){console.error("Error during plugin load:",e),l.showToast("Read-all plugin failed to load correctly",d("error"))}},onUnload:function(){y&&y(),l.showToast("Read-all plugin unloaded",d("info"))},settings:P};function R(e,i){if(!e)return null;if(i(e))return e;if(e?.props?.children){if(Array.isArray(e.props.children))for(const a of e.props.children){const t=R(a,i);if(t)return t}else if(typeof e.props.children=="object")return R(e.props.children,i)}return null}return p.default=N,Object.defineProperty(p,"__esModule",{value:!0}),p})({},vendetta.common,vendetta.patcher,vendetta.metro,vendetta.ui.assets,vendetta.ui.toasts,vendetta.plugin,vendetta.ui.components);
