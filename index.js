(function(a,t,d,n,s,o){"use strict";const u=o.findByProps("getUnreadGuilds"),c=o.findByProps("markRead"),i=function(){const r=function(){console.log("\u{1F4E9} Mark All as Read button clicked.");const e=u?.getUnreadGuilds?.()||[];if(!e.length){n.showToast("No unread messages.",n.ToastType.INFO);return}console.log("\u2705 Marking messages as read:",e),c.markRead(e),n.showToast("\u2705 Marked all messages as read!",n.ToastType.SUCCESS)};return t.React.createElement(d.Button,{onClick:r,style:{padding:10,backgroundColor:"blue",color:"white"}},"\u{1F4E9} Mark All as Read")},g=o.findByProps("ChannelItem"),l=s.after("render",g,function(r,e){return e?.props?.children&&(console.log("\u{1F535} Injecting MarkAllReadButton..."),e.props.children.push(t.React.createElement(i,null))),e});var f={onLoad:function(){console.log("\u2705 Read All Messages Plugin Loaded!"),l()},onUnload:function(){return l?.()}};return a.default=f,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta,vendetta.ui.components,vendetta.ui.toasts,vendetta.patcher,vendetta.metro);
