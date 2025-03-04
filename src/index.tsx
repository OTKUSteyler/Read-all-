import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
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

// Targeting "Sidebar" component now
function findSidebarComponent(attempt = 1) {
    console.log(`[ReadAll] Checking for Sidebar component... (Attempt ${attempt})`);

    let Sidebar = findByProps("Sidebar");

    if (!Sidebar) {
        if (attempt >= 10) {
            console.error("[ReadAll] ERROR: Sidebar component not found. Aborting.");
            return null;
        }
        return setTimeout(() => findSidebarComponent(attempt + 1), 500);
    }

    console.log("[ReadAll] Sidebar component found!");
    injectButton(Sidebar);
    return Sidebar;
}

function injectButton(Sidebar) {
    console.log("[ReadAll] Injecting button...");

    after("default", Sidebar, ([props], res) => {
        if (!res) {
            console.error("[ReadAll] ERROR: Sidebar component returned empty.");
            return res;
        }

        if (res.props.children.find((child) => child?.props?.id === "readall-button")) {
            console.log("[ReadAll] Button already exists. Skipping re-injection.");
            return res;
        }

        console.log("[ReadAll] Injecting button into Sidebar...");
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

export default {
    onLoad: () => {
        console.log("[ReadAll] Plugin loaded! Waiting for UI...");
        setTimeout(() => findSidebarComponent(), 2000);
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
    },
};
