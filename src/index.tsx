import { React } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { findByProps, after } from "@vendetta/metro";

// Find the relevant stores
const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

// Function to handle button click
const handleMarkAllRead = () => {
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  if (unreadGuilds.length === 0) {
    showToast("No unread messages found!", ToastType.INFO);
    return;
  }

  MessagesStore?.markRead(unreadGuilds);
  showToast("Marked all messages as read!", ToastType.SUCCESS);
};

// Mark All Read Button Component
const MarkAllReadButton = () => (
  <Button onClick={handleMarkAllRead}>Mark All as Read</Button>
);

// Inject the button into ChannelItem (This is a test injection)
const ChannelItem = findByProps("ChannelItem");

const patch = after("render", ChannelItem, ([props], res) => {
  res.props.children.push(<MarkAllReadButton />);
  return res;
});

export default {
  onLoad: () => {
    console.log("Plugin Loaded!");
    patch(); // Inject button when plugin loads
  },
  onUnload: () => {
    console.log("Plugin Unloaded!");
    patch?.(); // Unpatch button when plugin unloads
  },
};
