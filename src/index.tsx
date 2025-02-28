import { React, useState } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { findByProps, after } from "@vendetta/metro";

// Get the stores for unread guilds and mark read functionality
const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

const handleMarkAllRead = () => {
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  if (unreadGuilds.length === 0) {
    showToast("No unread messages found!", ToastType.INFO);
    return;
  }

  MessagesStore?.markRead(unreadGuilds);
  showToast("Marked all messages as read!", ToastType.SUCCESS);
};

const MarkAllReadButton = () => (
  <Button onClick={handleMarkAllRead}>Mark All as Read</Button>
);

// Patch the ChannelItem component to inject the button
const ChannelItem = findByProps("ChannelItem");

const patch = after("render", ChannelItem, ([props], res) => {
  res.props.children.push(<MarkAllReadButton />);
  return res;
});

export default {
  onLoad: () => {
    console.log("Plugin Loaded!");
    patch();  // Inject the button when the plugin loads
  },
  onUnload: () => {
    console.log("Plugin Unloaded!");
    patch?.(); // Unpatch the button on plugin unload
  },
};
