import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";

const ReadStateStore = findByProps("ack", "ackMessage");
const HeaderBar = findByProps("HeaderBar");

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

// Function to add the button to the DM header
function addButtonToHeader(attempts = 10) {
    if (!HeaderBar) {
        if (attempts <= 0) {
            console.error("[ReadAll] ❌ ERROR: HeaderBar component still not found. Aborting.");
            return;
        }
        console.log(`[ReadAll] 🔄 HeaderBar not found, retrying... (${10 - attempts}/10)`);
        setTimeout(() => addButtonToHeader(attempts - 1), 500);
        return;
    }

    after("default", HeaderBar, ([props], res) => {
        if (!res || !res.props || !Array.isArray(res.props.children)) return res;

        res.props.children.push(
            <HeaderBar.Button
                key="markAllRead"
                icon="CheckCircle" // Uses Discord's built-in checkmark icon
                onPress={markAllMessagesRead}
                tooltip="Mark All as Read"
            />
        );

        console.log("[ReadAll] ✅ Button added to DM header!");
        return res;
    });
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Searching for UI...");
        addButtonToHeader(); // Now it retries if it fails
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
