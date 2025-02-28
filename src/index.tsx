import { React } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import Settings from "./Settings";  // Ensure this is correct

const UnreadStore = findByProps("getUnreadGuilds");
const MessagesStore = findByProps("markRead");

const handleMarkAllRead = () => {
  console.log("📩 Mark All as Read button clicked.");

  // Get unread messages
  const unreadGuilds = UnreadStore?.getUnreadGuilds?.() || [];
  const excludedUsers = storage.get("excludedUsers", []);
  console.log("Unread Guilds:", unreadGuilds);
  console.log("Excluded Users:", excludedUsers);

  // Filter out excluded users
  const filteredGuilds = unreadGuilds.filter(
    (guildId) => !excludedUsers.includes(guildId)
  );

  if (filteredGuilds.length === 0) {
    showToast("All unread messages are from excluded users.", ToastType.INFO);
    return;
  }

  console.log("✅ Marking these as read:", filteredGuilds);
  MessagesStore.markRead(filteredGuilds);
  showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
};

// Debug the button rendering
const MarkAllReadButton = () => {
  console.log("Rendering Mark All Read Button");  // Debugging the button rendering
  return (
    <Button onClick={handleMarkAllRead} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
      📩 Mark All as Read
    </Button>
  );
};

// Debug injecting into the UI
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
  settings: Settings,
};
