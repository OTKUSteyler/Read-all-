import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { React } from "@vendetta/metro/common";
import { Button } from "@vendetta/ui/components";

function markAllMessagesRead() {
    const ReadStateStore = findByProps("ack", "ackMessage");

    if (!ReadStateStore) {
        console.error("[ReadAll] ERROR: ReadStateStore not found!");
        return;
    }

    // Mark all messages as read
    Object.keys(ReadStateStore.getUnreadCount()).forEach((channelId) => {
        ReadStateStore.ack(channelId);
    });

    console.log("[ReadAll] Marked all messages as read.");
}

function findSidebarComponent() {
    console.log("[ReadAll] Searching for sidebar components...");

    const possibleComponents = [
        "GuildsList",
        "Guilds",
        "GuildSidebar",
        "GuildContainer",
        "Sidebar",
        "ServerList",
        "Servers",
    ];

    for (const name of possibleComponents) {
        const component = findByProps(name);
        if (component) {
            console.log(`[ReadAll] Found component: ${name}`);
            return component;
        }
    }

    console.error("[ReadAll] ERROR: No sidebar component found!");
    return null;
}

function injectButton() {
    const Sidebar = findSidebarComponent();

    if (!Sidebar) {
        console.error("[ReadAll] ERROR: Sidebar component not found. Aborting injection.");
        return;
    }

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
        console.log("[ReadAll] Plugin loaded!");
        injectButton();
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
    },
};
