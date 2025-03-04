import { after } from "@vendetta/patcher";
import { findByProps, findByName, findAll } from "@vendetta/metro";
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

// Function to scan for any sidebar-related components
function findSidebarComponent(attempt = 1) {
    console.log(`[ReadAll] Searching for Sidebar Component... (Attempt ${attempt})`);

    const allModules = findAll(() => true);
    let SidebarComponent = null;

    for (const mod of allModules) {
        if (mod && typeof mod === "object") {
            for (const key in mod) {
                if (key.toLowerCase().includes("sidebar") || key.toLowerCase().includes("guilds")) {
                    SidebarComponent = mod[key];
                    break;
                }
            }
        }
        if (SidebarComponent) break;
    }

    if (!SidebarComponent) {
        if (attempt >= 10) {
            console.error("[ReadAll] ERROR: Sidebar component still not found. Aborting.");
            return null;
        }
        return setTimeout(() => findSidebarComponent(attempt + 1), 500);
    }

    console.log("[ReadAll] Sidebar Component found! Injecting button...");
    injectButton(SidebarComponent);
    return SidebarComponent;
}

// Injects button dynamically
function injectButton(SidebarComponent) {
    after("default", SidebarComponent, ([props], res) => {
        if (!res) {
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
