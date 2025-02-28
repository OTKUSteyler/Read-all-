import { React, flux, storage } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import Settings from "./Settings"; // Import settings
import styles from "./style"; // Import styles

// Ensure storage has excluded users
if (!storage.get("excludedUsers")) {
  storage.set("excludedUsers", []);
}

// Find Discord's unread messages store
const UnreadStore = findByProps("getUnreadCount", "getUnreadGuilds");
const MessagesStore = findByProps("markMessageRead");

// Mark all messages as read function
const handleMarkAllRead = () => {
  console.log("📩 Mark All as Read button clicked.");

  // Get unread messages
  const unreadMessages = UnreadStore?.getUnreadGuilds?.() || [];
  const excludedUsers = storage.get("excludedUsers", []);

  // Filter out messages from excluded users
  const filteredMessages = unreadMessages.filter(
    (guildId) => !excludedUsers.includes(guildId)
  );

  if (filteredMessages.length === 0) {
    showToast("All unread messages are from excluded users.", ToastType.INFO);
    return;
  }

  console.log("✅ Marking messages as read:", filteredMessages);

  // Use Discord's internal function to mark as read
  filteredMessages.forEach((guildId) => {
    MessagesStore.markMessageRead(guildId);
  });

  showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
};

// Button component
const MarkAllReadButton = () => (
  <Button style={styles.button} onClick={handleMarkAllRead}>
    📩 Mark All as Read
  </Button>
);

// Inject into UI
const Channels = findByProps("ChannelItem");
const patch = after("render", Channels, ([props], res) => {
  console.log("🔵 Injecting MarkAllReadButton...");
  res.props.children.push(<MarkAllReadButton />);
});

export default {
  onLoad: () => {
    console.log("✅ Read All Messages Plugin Loaded!");
    patch();
  },
  onUnload: () => patch?.(),
  settings: Settings,
};
