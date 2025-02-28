import { React, useState } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { findByProps, after } from "@vendetta/metro";
import { storage } from "@vendetta/plugin"; // For settings handling
import Settings from "./Settings"; // Import the settings page

// Find necessary stores
const UnreadStore = findByProps("getUnreadGuilds"); // Store for unread guilds
const MessagesStore = findByProps("markRead");     // Store to mark messages as read

// Handle Mark All as Read button click
const handleMarkAllRead = () => {
  console.log("📩 Mark All as Read button clicked.");

  // Get unread messages (if any)
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  if (unreadGuilds.length === 0) {
    showToast("No unread messages found!", ToastType.INFO);
    return;
  }

  console.log("✅ Marking these as read:", unreadGuilds);
  MessagesStore.markRead(unreadGuilds);

  showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
};

// Mark All Read Button Component
const MarkAllReadButton = () => (
  <Button onClick={handleMarkAllRead} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
    📩 Mark All as Read
  </Button>
);

// Inject button into Channels
const Channels = findByProps("ChannelItem");

const patch = after("render", Channels, ([props], res) => {
  if (!res?.props?.children) return res;
  res.props.children.push(<MarkAllReadButton />);
  return res;
});

// Plugin lifecycle
export default {
  onLoad: () => {
    console.log("✅ Read All Messages Plugin Loaded!");
    patch(); // Inject the button when the plugin loads
  },
  onUnload: () => {
    console.log("❌ Read All Messages Plugin Unloaded!");
    patch?.(); // Unpatch the button when the plugin unloads
  },
  settings: Settings, // Link the settings page to the plugin
};
