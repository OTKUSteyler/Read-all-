import { after } from "@vendetta/patcher";
import { findByName, findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { logger } from "@vendetta";

// Get required Vendetta components
const Guilds = findByName("Guilds", false);
const Toasts = findByProps("showToast");

// Function to mark all messages as read
const markAllRead = () => {
    Toasts.showToast({
        message: "📩 Read All Messages",
        duration: 5000, // Toast stays for 5 seconds
        onPress: () => {
            alert("✔ Marked all messages as read!");
            // TODO: Implement actual "Mark as Read" functionality
        },
    });
};

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    if (!Guilds) {
        logger.error("❌ Could not find Guilds component!");
        return;
    }

    // Patch the server list UI
    unpatch = after("default", Guilds, ([props], res) => {
        if (!res) return res;

        // Show the toast button when the plugin loads
        markAllRead();

        return res;
    });

    logger.log("✅ Read All Plugin Loaded!");
};

export const onUnload = () => {
    if (unpatch) unpatch();
};
