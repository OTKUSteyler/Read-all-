import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { Button } from "@vendetta/ui/components";

// Function to mark all messages as read (DMs & Servers)
function markAllMessagesRead() {
    const ReadStateStore = findByProps("ack", "ackMessage");

    if (!ReadStateStore) {
        console.error("[ReadAll] ERROR: ReadStateStore not found!");
        return;
    }

    Object.keys(ReadStateStore.getUnreadCount()).forEach((channelId) => {
        ReadStateStore.ack(channelId);
    });

    console.log("[ReadAll] ✅ Marked all messages as read.");
}

// Function to find a safe UI location for the button
function findSafeUIComponent(attempt = 1) {
    try {
        console.log(`[ReadAll] 🔎 Searching for a UI component... (Attempt ${attempt})`);

        // Look for multiple UI locations
        const GuildsNav = findByProps("GuildsNav");
        const Sidebar = findByProps("NavWrapper", "Sidebar");
        const PrivateChannels = findByProps("PrivateChannels", "DMUserEntry");

        // Try placing the button in multiple locations
        if (GuildsNav) {
            console.log("[ReadAll] 🎯 Found GuildsNav component!");
            injectButton(GuildsNav);
            return;
        }

        if (Sidebar) {
            console.log("[ReadAll] 🎯 Found Sidebar component!");
            injectButton(Sidebar);
            return;
        }

        if (PrivateChannels) {
            console.log("[ReadAll] 🎯 Found PrivateChannels (DM List) component!");
            injectButton(PrivateChannels);
            return;
        }

        if (attempt >= 5) {
            console.error("[ReadAll] ❌ ERROR: No valid UI component found. Aborting.");
            return;
        }

        setTimeout(() => findSafeUIComponent(attempt + 1), 1000);
    } catch (error) {
        console.error("[ReadAll] ⚠️ CRITICAL ERROR:", error);
    }
}

// Inject the button into the UI
function injectButton(UIComponent) {
    try {
        after("default", UIComponent, ([props], res) => {
            if (!res || !res.props) {
                console.error("[ReadAll] ❌ ERROR: UIComponent returned empty.");
                return res;
            }

            if (res.props.children.find((child) => child?.props?.id === "readall-button")) {
                console.log("[ReadAll] ⏩ Button already exists. Skipping re-injection.");
                return res;
            }

            res.props.children = [
                <div id="readall-button" style={{ padding: 10, marginBottom: 10 }}>
                    <Button onClick={markAllMessagesRead} style={{ width: "100%" }}>
                        ✅ Mark All as Read
                    </Button>
                </div>,
                ...res.props.children,
            ];

            return res;
        });

        console.log("[ReadAll] ✅ Button injected successfully.");
    } catch (error) {
        console.error("[ReadAll] ❌ Injection failed:", error);
    }
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] 🚀 Plugin loaded! Searching for UI...");
        setTimeout(() => findSafeUIComponent(), 2000);
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
