import { React } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

// Get unread messages & mark read functions
const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

// Button to mark all messages as read
const MarkAllReadButton = () => {
  const handleMarkAllRead = () => {
    console.log("📩 Mark All as Read button clicked.");
    const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
    
    if (!unreadGuilds.length) {
      showToast("No unread messages.", ToastType.INFO);
      return;
    }

    console.log("✅ Marking messages as read:", unreadGuilds);
    MessagesStore.markRead(unreadGuilds);
    showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
  };

  return (
    <Button onClick={handleMarkAllRead} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
      📩 Mark All as Read
    </Button>
  );
};

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
