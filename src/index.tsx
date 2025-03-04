import { React } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

// Get necessary Discord components
const ReadStateStore = findByProps("ackMessage", "getUnreadCount", "isMentioned");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");

// Find the **correct server list (guilds) UI**
const GuildsList = findByProps("Guilds", "UnreadBadge");

// Store patch reference
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
    console.error("[ReadAll] Could not find the server list UI.");
    return;
  }

  patch = after("default", GuildsList, ([props], res) => {
    if (!res) return res;

    // Create a new container for the button at the **top of the server list**
    res.props.children.unshift(
      <div style={{ padding: 10 }}>
        <Button onClick={markAllMessagesRead} style={{ width: "100%", marginBottom: 10 }}>
          ✅ Read All
        </Button>
      </div>
    );

    return res;
  });

  console.log("[ReadAll] Button injected into the server list.");
}

export default {
  start() {
    injectButton();
    console.log("[ReadAll] Plugin started.");
  },
  stop() {
    if (patch) patch();
    console.log("[ReadAll] Plugin stopped.");
  },
};
