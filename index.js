(function(a,o,u,e,n){"use strict";const l=n.findByProps("getUnreadGuilds"),s=n.findByProps("markRead"),i=function(){const t=l?.getUnreadGuilds?.()||[];if(t.length===0){e.showToast("No unread messages found!",e.ToastType.INFO);return}s?.markRead(t),e.showToast("Marked all messages as read!",e.ToastType.SUCCESS)},c=function(){return o.React.createElement(u.Button,{onClick:i},"Mark All as Read")},f=n.findByProps("ChannelItem"),d=n.after("render",f,function(t,r){return r.props.children.push(o.React.createElement(c,null)),r});var g={onLoad:function(){console.log("Plugin Loaded!"),d()},onUnload:function(){console.log("Plugin Unloaded!"),d?.()}};return a.default=g,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta,vendetta.ui.components,vendetta.ui.toasts,vendetta.metro);
