import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";
import { React } from "@vendetta/metro/common";

const ReadStateStore = findByProps("ack", "ackMessage");
const OverlayButtons = findByProps("OverlayButton");

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

// Function to inject the button (retry logic added)
function addOverlayButton(attempts = 10) {
    if (!OverlayButtons) {
        if (attempts <= 0) {
            console.error("[ReadAll] ❌ ERROR: Overlay button component still not found. Aborting.");
            return;
        }
        console.log(`[ReadAll] 🔄 Overlay button not found, retrying... (${10 - attempts}/10)`);
        setTimeout(() => addOverlayButton(attempts - 1), 500);
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
        console.log("[ReadAll] 🚀 Plugin loaded! Searching for UI...");
        addOverlayButton(); // Now it retries if it fails
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
