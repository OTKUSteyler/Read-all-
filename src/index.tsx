import { React } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

// Get Discord's Read State and Channel Store
const ReadStateStore = findByProps("ackMessage", "getUnreadCount", "isMentioned");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");

// Patch reference
let patch: any = null;

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

// Inject button into the top of the server list
function injectButton() {
  const GuildsList = findByProps("default", "guilds");

  if (!GuildsList) {
    console.error("[ReadAll] Failed to find GuildsList.");
    return;
  }

  patch = after("default", GuildsList, ([props], res) => {
    if (!res) return res;

    res.props.children.unshift(
      <Button onClick={markAllMessagesRead} style={{ marginBottom: 10 }}>
        ✅ Read All
      </Button>
    );

    return res;
  });
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
