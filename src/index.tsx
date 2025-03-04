import { React } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

// Get Discord modules
const ReadStateStore = findByProps("ackMessage", "getUnreadCount", "isMentioned");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");
const Sidebar = findByName("Sidebar", false); // Correctly targeting the sidebar

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

// Inject button into Revenge's sidebar
function injectButton() {
  if (!Sidebar) {
    console.error("[ReadAll] Could not find the sidebar UI.");
    return;
  }

  patch = after("default", Sidebar, ([props], res) => {
    if (!res) return res;

    res.props.children.unshift(
      <Button onClick={markAllMessagesRead} style={{ margin: 10 }}>
        ✅ Read All
      </Button>
    );

    return res;
  });

  console.log("[ReadAll] Button injected into the sidebar.");
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
