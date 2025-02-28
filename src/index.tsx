import { React } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { findByProps, after } from "@vendetta/metro";

// Find necessary stores
const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

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
    patch();
  },
  onUnload: () => patch?.(),
};
