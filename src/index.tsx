import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";

// Get the Read State store
const ReadStateStore = findByProps("ack", "ackMessage");

// Get the Header Bar and Experimental Button components
const HeaderBar = findByProps("HeaderBar");
const ExperimentalButton = findByProps("Button", "ButtonColors");

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

// Function to add the experimental button to the header
function addExperimentalButton(attempts = 10) {
    if (!HeaderBar || !ExperimentalButton) {
        if (attempts <= 0) {
            console.error("[ReadAll] ❌ ERROR: Required components not found. Aborting.");
            return;
        }
        console.log(`[ReadAll] 🔄 UI components not found, retrying... (${10 - attempts}/10)`);
        setTimeout(() => addExperimentalButton(attempts - 1), 500);
        return;
    }

    after("default", HeaderBar, ([props], res) => {
        if (!res || !res.props || !Array.isArray(res.props.children)) return res;

        res.props.children.push(
            <ExperimentalButton
                key="markAllRead"
                text="📩 Mark All Read"
                onPress={markAllMessagesRead}
                color={ExperimentalButton.ButtonColors.BRAND}
            />
        );

        console.log("[ReadAll] ✅ Experimental button added to header!");
        return res;
    });
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Adding experimental button...");
        addExperimentalButton(); // Retry if it fails
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
