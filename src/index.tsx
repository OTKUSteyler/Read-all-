import { React } from "@vendetta/common";
import { before } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

// Initialize default settings
storage.unreadGuildsCount ??= 0;

// Find necessary Discord modules
const GuildStore = findByProps("getGuilds", "getGuild");
const ChannelStore = findByProps("getChannel", "getMutablePrivateChannels");
const ReadStateStore = findByProps("getUnreadCount", "hasUnread");
const ReadStateActions = findByProps("markGuildAsRead", "markChannelAsRead");
const TabBarModule = findByProps("TabBar");
const TabBar = TabBarModule?.TabBar;
const NavigationStack = findByName("NavigationStack");

// Track patches for cleanup
let unpatchTabs;
let unpatchNavigation;
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
function getToastOptions(type) {
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

// Plugin API exports
export default {
    onLoad: () => {
        try {
            // Try to patch TabBar first (main approach)
            if (TabBar) {
                unpatchTabs = before("render", TabBar.prototype, function (args) {
                    const self = this;
                    
                    try {
                        // Only patch tabs with items
                        if (!self.props?.items?.length) return;
                        
                        // Find the main tab bar by checking for specific tab types
                        const isMainTabBar = self.props.items.some(
                            item => item.id === "home" || item.id === "friends" || item.id === "nitro"
                        );
                        
                        if (!isMainTabBar) return;
                        
                        // Create our custom "Read All" tab if it doesn't exist yet
                        const existingTabIndex = self.props.items.findIndex(i => i.id === "read-all");
                        if (existingTabIndex === -1) {
                            // Create our custom "Read All" tab
                            const readAllTab = {
                                id: "read-all",
                                title: "Read All",
                                icon: getAssetIDByName("ic_check_24px"), // Using a definitely available icon
                                onPress: markAllAsRead
                            };
                            
                            // Add our tab to the items
                            self.props.items = [...self.props.items, readAllTab];
                        }
                    } catch (e) {
                        console.error("Error in TabBar patch:", e);
                    }
                });
                
                console.log("Successfully patched TabBar");
            } 
            
            // Alternative approach using NavigationStack
            if (NavigationStack && !unpatchTabs) {
                unpatchNavigation = before("render", NavigationStack.prototype, function(args) {
                    const self = this;
                    
                    try {
                        // Check if this is the bottom navigation
                        if (self.props?.routes && Array.isArray(self.props.routes)) {
                            // Check if we have navigation routes
                            const isBottomNav = self.props.routes.some(
                                route => route.name === "Home" || route.name === "Friends"
                            );
                            
                            if (isBottomNav) {
                                // Add our route if not exists
                                const existingRouteIndex = self.props.routes.findIndex(r => r.name === "ReadAll");
                                if (existingRouteIndex === -1) {
                                    // Add our route
                                    self.props.routes.push({
                                        name: "ReadAll",
                                        params: {},
                                        render: () => null,
                                        icon: getAssetIDByName("ic_check_24px"),
                                        onPress: markAllAsRead
                                    });
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Error in NavigationStack patch:", e);
                    }
                });
                
                console.log("Using fallback NavigationStack patch");
            }
            
            if (!unpatchTabs && !unpatchNavigation) {
                console.error("Could not patch any navigation components");
                showToast("Read-all plugin may not work correctly", getToastOptions("warning"));
            } else {
                showToast("Read-all plugin loaded", getToastOptions("success"));
            }
        } catch (e) {
            console.error("Error during plugin load:", e);
            showToast("Read-all plugin failed to load correctly", getToastOptions("error"));
        }
    },
    
    onUnload: () => {
        // Clean up patches
        if (unpatchTabs) unpatchTabs();
        if (unpatchNavigation) unpatchNavigation();
        showToast("Read-all plugin unloaded", getToastOptions("info"));
    },
    
    settings: Settings
};
