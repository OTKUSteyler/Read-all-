import { React } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

// Get required Discord components
const ReadStateStore = findByProps("ackMessage", "getUnreadCount", "isMentioned");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");
const GuildsList = findByProps("Guilds", "container", "scroller"); // Likely new name for the server list

// Debug: Confirm UI component exists
console.log("[ReadAll] Checking UI components...");

if (!GuildsList) {
  console.error("[ReadAll] ERROR: GuildsList component not found!");
}

// Function to mark all messages as read
function markAllMessagesRead() {
  const channels = ChannelStore.getChannels();
  let unreadCount = 0;

  Object.values(channels).forEach((channel: any) => {
    if (ReadStateStore.getUnreadCount(channel.id) > 0) {
      ReadStateStore.ackMessage(channel.id);
      unreadCount++;
    }
  });

  showToast(`✅ Marked ${unreadCount} messages as read!`);
}

// Inject button into the **Sidebar**
function injectButton() {
  if (!GuildsList) {
    console.error("[ReadAll] ERROR: GuildsList not found. Button injection failed.");
    return;
  }

  console.log("[ReadAll] Found GuildsList, injecting button...");

  // Patch the sidebar UI
  after("default", GuildsList, ([props], res) => {
    if (!res) {
      console.error("[ReadAll] ERROR: GuildsList returned empty.");
      return res;
    }

    console.log("[ReadAll] Injecting button into the sidebar...");

    // Insert the button before the server list
    res.props.children = [
      <div style={{ padding: 10, marginBottom: 10 }}>
        <Button onClick={markAllMessagesRead} style={{ width: "100%" }}>
          ✅ Read All
        </Button>
      </div>,
      ...res.props.children,
    ];

    return res;
  });

  console.log("[ReadAll] Button injected successfully.");
}

export default {
  start() {
    console.log("[ReadAll] Plugin starting...");
    injectButton();
    console.log("[ReadAll] Plugin started.");
  },
  stop() {
    console.log("[ReadAll] Plugin stopping...");
  },
};
