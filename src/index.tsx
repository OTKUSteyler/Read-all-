import { after } from "@vendetta/patcher";
import { findByProps, findByName, findByDisplayName } from "@vendetta/metro";
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

function waitForSidebarComponent(callback: (component: any) => void) {
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        console.log(`[ReadAll] Checking for sidebar component... (Attempt ${attempts})`);

        const Sidebar = findByProps("guilds", "wrapper");
        if (Sidebar) {
            console.log("[ReadAll] Sidebar component found!");
            clearInterval(interval);
            callback(Sidebar);
        }

        if (attempts > 10) { // Stop after 10 attempts (~5 seconds)
            console.error("[ReadAll] ERROR: Sidebar component not found. Aborting.");
            clearInterval(interval);
        }
    }, 500); // Check every 500ms
}

function injectButton(Sidebar: any) {
    console.log("[ReadAll] Injecting button into sidebar...");

    after("default", Sidebar, ([props], res) => {
        if (!res) {
            console.error("[ReadAll] ERROR: Sidebar component returned empty.");
            return res;
        }

        console.log("[ReadAll] Injecting button...");
        
        res.props.children = [
            <div style={{ padding: 10, marginBottom: 10 }}>
                <Button onClick={markAllMessagesRead} style={{ width: "100%" }}>
                    ✅ Read All
                </Button>
            </div>,
            ...res.props.children,
        ];

        return res;
    });

    console.log("[ReadAll] Button injection complete.");
}

// Plugin startup
export default {
    onLoad: () => {
        console.log("[ReadAll] Plugin loaded! Waiting for UI...");
        waitForSidebarComponent(injectButton);
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
    },
};
