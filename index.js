(function(l,s,g,n,y,a,d){"use strict";d.storage.unreadGuildsCount??=0;const R=n.findByProps("getGuilds","getGuild"),b=n.findByProps("getChannel","getMutablePrivateChannels"),f=n.findByProps("getUnreadCount","hasUnread"),h=n.findByProps("markGuildAsRead","markChannelAsRead");n.findByProps("NavigationContainer");const p=n.findByProps("TabBar")?.TabBar;let u,c=!0;function T(){try{const e=[],o=Object.values(R.getGuilds());for(const t of o)f.hasUnread(t.id)&&(e.push(t.id),h.markGuildAsRead(t.id));const i=Object.values(b.getMutablePrivateChannels());for(const t of i)f.hasUnread(t.id)&&h.markChannelAsRead(t.id);d.storage.unreadGuildsCount=(d.storage.unreadGuildsCount||0)+e.length,c&&(a.showToast(`Marked ${e.length} guilds as read`,r("success")),c=!1,setTimeout(function(){return c=!0},2e3))}catch(e){console.error("Error in markAllAsRead:",e),a.showToast("Failed to mark all as read",r("error"))}}function r(e){try{return typeof a.showToast=="function"?a.showToast.length>=2?{type:e}:{content:e}:{}}catch{return{}}}var m={onLoad:function(){p?u=g.before("render",p.prototype,function(e){const o=this;try{if(!o.props?.items?.length||!o.props.items.some(function(t){return t.id==="home"||t.id==="friends"}))return;const i={id:"read-all",title:"Read All",icon:y.getAssetIDByName("ic_done_all_24px"),onPress:T};o.props.items=[...o.props.items,i]}catch(i){console.error("Error in TabBar patch:",i)}}):(console.error("TabBar not found. Plugin may not work correctly."),a.showToast("Read-all plugin: TabBar not found",r("error"))),a.showToast("Read-all plugin loaded",r("success"))},onUnload:function(){u&&u(),a.showToast("Read-all plugin unloaded",r("info"))},settings:function(){return s.React.createElement("div",{style:{padding:16}},s.React.createElement("h2",{style:{marginBottom:16}},"Read-all Statistics"),s.React.createElement("p",null,"Total unread guilds marked as read: ",d.storage.unreadGuildsCount||0),s.React.createElement("div",{style:{marginTop:16}},s.React.createElement("button",{style:{backgroundColor:"#5865F2",color:"white",padding:"8px 16px",borderRadius:3,border:"none"},onClick:function(){d.storage.unreadGuildsCount=0,a.showToast("Statistics reset",r("success"))}},"Reset Statistics")))}};return l.default=m,Object.defineProperty(l,"__esModule",{value:!0}),l})({},vendetta.common,vendetta.patcher,vendetta.metro,vendetta.ui.assets,vendetta.ui.toasts,vendetta.plugin);
