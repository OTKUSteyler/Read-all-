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

// Function to inject the button into the sidebar
function injectButton() {
    console.log("[ReadAll] Injecting button...");

    const Sidebar = findByProps("guilds", "wrapper");
    if (!Sidebar) {
        console.error("[ReadAll] ERROR: Sidebar component not found!");
        return;
    }

    after("default", Sidebar, ([props], res) => {
        if (!res) {
            console.error("[ReadAll] ERROR: Sidebar component returned empty.");
            return res;
        }

        // Ensure the button isn't injected multiple times
        if (res.props.children.find((child) => child?.props?.id === "readall-button")) {
            console.log("[ReadAll] Button already exists. Skipping re-injection.");
            return res;
        }

        console.log("[ReadAll] Injecting button into sidebar...");
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

// Watch for UI updates and re-inject if needed
let observer: MutationObserver | null = null;
function watchForChanges() {
    const sidebarElement = document.querySelector('[class*="guilds"]'); // Try to detect sidebar changes
    if (!sidebarElement) {
        console.error("[ReadAll] ERROR: Sidebar element not found!");
        return;
    }

    observer = new MutationObserver(() => {
        console.log("[ReadAll] Sidebar updated! Checking for button...");
        injectButton(); // Re-inject button when sidebar changes
    });

    observer.observe(sidebarElement, { childList: true, subtree: true });
}

// Plugin startup
export default {
    onLoad: () => {
        console.log("[ReadAll] Plugin loaded! Waiting for UI...");
        injectButton();
        watchForChanges(); // Start observing UI changes
    },
    onUnload: () => {
        console.log("[ReadAll] Plugin unloaded!");
        if (observer) observer.disconnect(); // Stop observing when the plugin is disabled
    },
};
