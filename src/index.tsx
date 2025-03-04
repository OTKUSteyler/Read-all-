import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { Button } from "@vendetta/ui/components";

function markAllMessagesRead() {
    const ReadStateStore = findByProps("ack", "ackMessage");

    if (!ReadStateStore) {
        console.error("[ReadAll] ERROR: ReadStateStore not found!");
        return;
    }

    Object.keys(ReadStateStore.getUnreadCount()).forEach((channelId) => {
        ReadStateStore.ack(channelId);
    });

    console.log("[ReadAll] Marked all messages as read.");
}

// Function to safely find the sidebar
function findSidebarComponent(attempt = 1) {
    try {
        console.log(`[ReadAll] Searching for Sidebar Component... (Attempt ${attempt})`);

        // Try to find the sidebar using known properties
        const GuildsNav = findByProps("GuildsNav");
        const Sidebar = findByProps("NavWrapper", "Sidebar");

        if (GuildsNav) {
            console.log("[ReadAll] Found GuildsNav component!");
            injectButton(GuildsNav);
            return;
        }

        if (Sidebar) {
            console.log("[ReadAll] Found Sidebar component!");
            injectButton(Sidebar);
            return;
        }

        if (attempt >= 5) {
            console.error("[ReadAll] ERROR: Sidebar component not found. Aborting.");
            return;
        }

        setTimeout(() => findSidebarComponent(attempt + 1), 1000);
    } catch (error) {
        console.error("[ReadAll] CRITICAL ERROR:", error);
    }
}

// Inject button safely
function injectButton(SidebarComponent) {
    try {
        after("default", SidebarComponent, ([props], res) => {
            if (!res || !res.props) {
                console.error("[ReadAll] ERROR: SidebarComponent returned empty.");
                return res;
            }

            if (res.props.children.find((child) => child?.props?.id === "readall-button")) {
                console.log("[ReadAll] Button already exists. Skipping re-injection.");
                return res;
            }

            res.props.children = [
                <div id="readall-button" style={{ padding: 10, marginBottom: 10 }}>
                    <Button onClick={markAllMessagesRead} style={{ width: "100%" }}>
                        ✅ Read All
                    </Button>
                </div>,
                ...res.props.children,
            ];

            return res;
        });

        console.log("[ReadAll] Button injected successfully.");
    } catch (error) {
        console.error("[ReadAll] Injection failed:", error);
    }
}

// Plugin lifecycle
export default {
    onLoad: () => {
        console.log("[ReadAll] Plugin loaded! Scanning UI components...");
        setTimeout(() => findSidebarComponent(), 2000);
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
    },
};
