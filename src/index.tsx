import { React } from "@vendetta/common";
import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { findInReactTree } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";

// Initialize default settings
storage.unreadGuildsCount ??= 0;

// Find necessary Discord modules
const GuildStore = findByProps("getGuilds", "getGuild");
const ChannelStore = findByProps("getChannel", "getMutablePrivateChannels");
const ReadStateStore = findByProps("getUnreadCount", "hasUnread");
const ReadStateActions = findByProps("markGuildAsRead", "markChannelAsRead");
const NavigationNative = findByProps("NavigationContainer");
const TabBar = findByProps("TabBar")?.TabBar;

// Track unread channels count for stats
let unpatchTabs: () => void;
let canShowToast = true;

// Handle marking all guilds as read
function markAllAsRead() {
    try {
        // Get all unread guilds and channels
        const unreadGuilds = [];
        const guilds = Object.values(GuildStore.getGuilds());
        
        for (const guild of guilds) {
            if (ReadStateStore.hasUnread(guild.id)) {
                unreadGuilds.push(guild.id);
                ReadStateActions.markGuildAsRead(guild.id);
            }
        }
        
        // Mark all DMs as read
        const privateChannels = Object.values(ChannelStore.getMutablePrivateChannels());
        for (const channel of privateChannels) {
            if (ReadStateStore.hasUnread(channel.id)) {
                ReadStateActions.markChannelAsRead(channel.id);
            }
        }
        
        // Update stats
        storage.unreadGuildsCount = (storage.unreadGuildsCount || 0) + unreadGuilds.length;
        
        // Show success toast
        if (canShowToast) {
            showToast(`Marked ${unreadGuilds.length} guilds as read`, getToastOptions("success"));
            // Prevent toast spam by limiting frequency
            canShowToast = false;
            setTimeout(() => canShowToast = true, 2000);
        }
    } catch (e) {
        console.error("Error in markAllAsRead:", e);
        showToast("Failed to mark all as read", getToastOptions("error"));
    }
}

// Helper function for toast options compatibility
function getToastOptions(type: string) {
    try {
        // Check if old API or new API
        if (typeof showToast === "function") {
            if (showToast.length >= 2) {
                return { type };
            }
            return { content: type };
        }
        return {}; // Fallback empty object
    } catch (e) {
        return {}; // Return empty object on error
    }
}

// Plugin initialization
export default {
    onLoad: () => {
        // Patch the tab bar to add our button
        if (TabBar) {
            unpatchTabs = before("render", TabBar.prototype, function (args) {
                const self = this;
                
                try {
                    // Only patch the main tab bar
                    if (!self.props?.items?.length) return;
                    
                    // Find the main tab bar by checking for specific tab types
                    const isMainTabBar = self.props.items.some(
                        item => item.id === "home" || item.id === "friends"
                    );
                    
                    if (!isMainTabBar) return;
                    
                    // Create our custom "Read All" tab
                    const readAllTab = {
                        id: "read-all",
                        title: "Read All",
                        icon: getAssetIDByName("ic_done_all_24px"),
                        onPress: markAllAsRead
                    };
                    
                    // Add our tab to the items
                    self.props.items = [...self.props.items, readAllTab];
                } catch (e) {
                    console.error("Error in TabBar patch:", e);
                }
            });
        } else {
            console.error("TabBar not found. Plugin may not work correctly.");
            showToast("Read-all plugin: TabBar not found", getToastOptions("error"));
        }
        
        showToast("Read-all plugin loaded", getToastOptions("success"));
    },
    
    onUnload: () => {
        // Clean up patches
        if (unpatchTabs) unpatchTabs();
        showToast("Read-all plugin unloaded", getToastOptions("info"));
    },
    
    settings: () => {
        return (
            <div style={{ padding: 16 }}>
                <h2 style={{ marginBottom: 16 }}>Read-all Statistics</h2>
                <p>Total unread guilds marked as read: {storage.unreadGuildsCount || 0}</p>
                <div style={{ marginTop: 16 }}>
                    <button
                        style={{
                            backgroundColor: "#5865F2",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: 3,
                            border: "none"
                        }}
                        onClick={() => {
                            storage.unreadGuildsCount = 0;
                            showToast("Statistics reset", getToastOptions("success"));
                        }}
                    >
                        Reset Statistics
                    </button>
                </div>
            </div>
        );
    }
};
