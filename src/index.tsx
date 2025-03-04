import { React } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

// Get required Discord components
const ReadStateStore = findByProps("ackMessage", "getUnreadCount", "isMentioned");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");

// Debug: Check what UI components exist
console.log("[ReadAll] Looking for GuildsList...");
const GuildsList = findByProps("Guilds", "UnreadBadge");

// Patch reference
let patch: any = null;

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

// Inject button into the **Server List (Guilds UI)**
function injectButton() {
  if (!GuildsList) {
    console.error("[ReadAll] ERROR: GuildsList component not found!");
    return;
  }

  console.log("[ReadAll] GuildsList found! Injecting button...");

  patch = after("default", GuildsList, ([props], res) => {
    if (!res) {
      console.error("[ReadAll] ERROR: GuildsList returned empty.");
      return res;
    }

    console.log("[ReadAll] Injecting button into the UI...");

    // Force UI update
    res.props.children = [
      <div style={{ padding: 10 }}>
        <Button onClick={markAllMessagesRead} style={{ width: "100%", marginBottom: 10 }}>
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
    if (patch) {
      patch();
      console.log("[ReadAll] Plugin stopped, patch removed.");
    }
  },
};
