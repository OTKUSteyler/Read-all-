import { React } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";

// Basic logic to mark all messages as read
const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

const handleMarkAllRead = () => {
  console.log("📩 Mark All as Read button clicked.");
  
  // Get unread messages
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  if (unreadGuilds.length === 0) {
    showToast("No unread messages found!", ToastType.INFO);
    return;
  }

  console.log("✅ Marking these as read:", unreadGuilds);
  MessagesStore.markRead(unreadGuilds);

  showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
};

// Add the button to the UI
const MarkAllReadButton = () => (
  <Button onClick={handleMarkAllRead} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
    📩 Mark All as Read
  </Button>
);

// Inject button into the UI
const Channels = findByProps("ChannelItem");
const patch = after("render", Channels, ([props], res) => {
  if (!res?.props?.children) return res;
  console.log("🔵 Injecting MarkAllReadButton...");
  res.props.children.push(<MarkAllReadButton />);
  return res;
});

export default {
  onLoad: () => {
    console.log("✅ Read All Messages Plugin Loaded!");
    patch();
  },
  onUnload: () => patch?.(),
};
