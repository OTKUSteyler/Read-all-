import { after } from "@vendetta/patcher";
import { findByName, findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { logger } from "@vendetta";

// Get the Guilds component (server list)
const Guilds = findByName("Guilds", false);
const Toasts = findByProps("showToast");

// Function to mark all messages as read
const markAllRead = () => {
    Toasts.showToast({
        message: "✔ Read All Messages",
        duration: 3000, // 3 seconds
        onPress: () => {
            alert("Marked all as read! (Implement actual functionality)");
        },
    });
};

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    if (!Guilds) {
        logger.error("❌ Could not find Guilds component!");
        return;
    }

    unpatch = after("default", Guilds, ([props], res) => {
        if (!res) return res;

        // Automatically show toast on startup (acting as a floating button)
        markAllRead();

        return res;
    });

    logger.log("✅ Read All Plugin Loaded!");
};

export const onUnload = () => {
    if (unpatch) unpatch();
};
