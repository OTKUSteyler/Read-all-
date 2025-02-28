import { React, flux, storage } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

// Find the correct functions from Discord's internals
const MessagesStore = findByProps("markMessageRead");
const UnreadStore = findByProps("getUnreadGuilds");

// Ensure excludedUsers storage exists
if (!storage.get("excludedUsers")) {
  storage.set("excludedUsers", []);
}

// Function to mark all messages as read
const handleMarkAllRead = () => {
  console.log("📩 Mark All as Read button clicked.");

  // Get unread guilds (servers with unread messages)
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  const excludedUsers = storage.get("excludedUsers", []);

  // Filter out excluded users
  const filteredGuilds = unreadGuilds.filter(
    (guildId) => !excludedUsers.includes(guildId)
  );

  if (filteredGuilds.length === 0) {
    showToast("All unread messages are from excluded users.", ToastType.INFO);
    return;
  }

  console.log("✅ Marking these as read:", filteredGuilds);

  // Mark each as read
  filteredGuilds.forEach((guildId) => {
    MessagesStore.markMessageRead(guildId);
  });

  showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
};

// Button component
const MarkAllReadButton = () => (
  <Button onClick={handleMarkAllRead} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
    📩 Mark All as Read
  </Button>
);

// Inject button into UI
const Channels = findByProps("ChannelItem");
const patch = after("render", Channels, ([props], res) => {
  if (!res?.props?.children) return res;
  console.log("🔵 Injecting MarkAllReadButton...");
  res.props.children.push(<MarkAllReadButton />);
  return res;
});

export default {
  onLoad: () => {
    console.log("✅ Plugin Loaded!");
    patch();
  },
  onUnload: () => patch?.(),
};
