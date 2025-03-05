import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";

// Get Read State store
const ReadStateStore = findByProps("ack", "ackMessage");

// Find Sidebar component
const Sidebar = findByProps("default", "Sidebars");
const OverlayButton = findByProps("Button", "ButtonColors");

// Function to mark all as read
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

// Function to add a button to the Sidebar
function addSidebarButton(attempts = 10) {
    if (!Sidebar || !OverlayButton) {
        if (attempts <= 0) {
            console.error("[ReadAll] ❌ ERROR: Sidebar/Overlay not found. Aborting.");
            return;
        }
        console.log(`[ReadAll] 🔄 UI components not found, retrying... (${10 - attempts}/10)`);
        setTimeout(() => addSidebarButton(attempts - 1), 500);
        return;
    }

    after("default", Sidebar, ([props], res) => {
        if (!res || !res.props || !Array.isArray(res.props.children)) return res;

        res.props.children.push(
            <OverlayButton
                key="markAllRead"
                text="📩 Read All"
                onPress={markAllMessagesRead}
                color={OverlayButton.ButtonColors.BRAND}
            />
        );

        console.log("[ReadAll] ✅ Sidebar button added!");
        return res;
    });
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Adding sidebar button...");
        addSidebarButton(); // Retry if it fails
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
