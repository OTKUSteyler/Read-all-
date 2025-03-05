import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";

// Get Discord's Read State functions
const ReadStateStore = findByProps("ack", "ackMessage");

// Function to mark all messages as read
function markAllMessagesRead() {
    if (!ReadStateStore) {
        console.error("[ReadAll] ❌ ERROR: ReadStateStore not found!");
        showToast("❌ Error: Read state not found", { type: "error" });
        return;
    }

    Object.keys(ReadStateStore.getUnreadCount()).forEach((channelId) => {
        ReadStateStore.ack(channelId);
    });

    console.log("[ReadAll] ✅ Marked all messages as read.");
    showToast("✅ All messages marked as read!", { type: "success" });
}

// Function to modify the long-press menu
function patchMessagesButton() {
    const ChannelList = findByProps("ChannelList");

    if (!ChannelList) {
        console.error("[ReadAll] ❌ ERROR: Messages button component not found!");
        return;
    }

    after("default", ChannelList, ([props], res) => {
        if (!res || !res.props || !res.props.onLongPress) {
            console.error("[ReadAll] ❌ ERROR: Could not modify long-press action.");
            return res;
        }

        // Modify the long-press action to show the option
        const originalLongPress = res.props.onLongPress;
        res.props.onLongPress = (event) => {
            originalLongPress(event); // Keep existing behavior

            // Add our custom option
            setTimeout(() => {
                showToast("🔘 Hold down to mark all messages as read!", { type: "info" });
                markAllMessagesRead();
            }, 500); // Small delay for better UI
        };

        console.log("[ReadAll] ✅ Long-press action modified!");
        return res;
    });
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Patching messages button...");
        patchMessagesButton();
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
