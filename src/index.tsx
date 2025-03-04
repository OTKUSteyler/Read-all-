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

// Function to find the Sidebar wrapper instead of Sidebar
function findSidebarContainer(attempt = 1) {
    console.log(`[ReadAll] Searching for Sidebar Container... (Attempt ${attempt})`);

    let SidebarWrapper = findByProps("guilds", "base") || findByProps("navWrapper");

    if (!SidebarWrapper) {
        if (attempt >= 10) {
            console.error("[ReadAll] ERROR: Sidebar wrapper not found. Aborting.");
            return null;
        }
        return setTimeout(() => findSidebarContainer(attempt + 1), 500);
    }

    console.log("[ReadAll] Sidebar Wrapper found! Injecting button...");
    injectButton(SidebarWrapper);
    return SidebarWrapper;
}

// Injects button into the UI dynamically
function injectButton(SidebarWrapper) {
    after("default", SidebarWrapper, ([props], res) => {
        if (!res) {
            console.error("[ReadAll] ERROR: SidebarWrapper returned empty.");
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
        console.log("[ReadAll] Plugin loaded! Waiting for UI...");
        setTimeout(() => findSidebarContainer(), 2000);
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
    },
};
