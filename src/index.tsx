import { after } from "@vendetta/patcher";
import { findByProps, findByName, findByDisplayName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { Button } from "@vendetta/ui/components";

const MAX_RETRIES = 10;
let retryCount = 0;

// Function to mark all messages as read (DMs & Servers)
function markAllMessagesRead() {
    const ReadStateStore = findByProps("ack", "ackMessage");

    if (!ReadStateStore) {
        console.error("[ReadAll] ❌ ERROR: ReadStateStore not found!");
        return;
    }

    Object.keys(ReadStateStore.getUnreadCount()).forEach((channelId) => {
        ReadStateStore.ack(channelId);
    });

    console.log("[ReadAll] ✅ Marked all messages as read.");
}

// Function to locate a valid UI component
function findValidUIComponent() {
    console.log(`[ReadAll] 🔎 Searching for a UI component... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);

    try {
        // Try different UI components for both DMs and server list
        const GuildsNav = findByProps("GuildsNav");
        const Sidebar = findByProps("NavWrapper", "Sidebar");
        const PrivateChannels = findByProps("PrivateChannels", "DMUserEntry");

        if (GuildsNav) {
            console.log("[ReadAll] 🎯 Found GuildsNav!");
            injectButton(GuildsNav);
            return;
        }

        if (Sidebar) {
            console.log("[ReadAll] 🎯 Found Sidebar!");
            injectButton(Sidebar);
            return;
        }

        if (PrivateChannels) {
            console.log("[ReadAll] 🎯 Found PrivateChannels (DM List)!");
            injectButton(PrivateChannels);
            return;
        }

        // If no UI found, retry up to MAX_RETRIES
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(findValidUIComponent, 2000); // Wait 2s before retrying
        } else {
            console.error("[ReadAll] ❌ ERROR: No valid UI component found. Aborting.");
        }
    } catch (error) {
        console.error("[ReadAll] ⚠️ CRITICAL ERROR:", error);
    }
}

// Injects the button into the UI
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
        setTimeout(findValidUIComponent, 3000); // Delay startup for better UI detection
    },
    onUnload: () => {
        console.log("[ReadAll] 🛑 Plugin unloaded!");
    },
};
