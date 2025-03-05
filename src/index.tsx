import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";
import { React } from "@vendetta/metro/common";

// Get Discord's read state functions
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

// Patch the overlay buttons to add a "Mark All Read" button
function patchOverlayButtons() {
    const OverlayButtons = findByProps("OverlayButton");

    if (!OverlayButtons) {
        console.error("[ReadAll] ❌ ERROR: Overlay button component not found!");
        return;
    }

    after("default", OverlayButtons, ([props], res) => {
        if (!res || !res.props || !Array.isArray(res.props.children)) return res;

        res.props.children.push(
            <OverlayButtons.OverlayButton
                key="markAllRead"
                icon="CheckCircle" // Uses Discord's built-in checkmark icon
                onPress={markAllMessagesRead}
                tooltip="Mark All as Read"
            />
        );

        console.log("[ReadAll] ✅ Overlay button added!");
        return res;
    });
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Adding overlay button...");
        patchOverlayButtons();
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
