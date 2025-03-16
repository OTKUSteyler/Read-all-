import { React } from "@vendetta/common";
import { before, after } from "@vendetta/patcher";
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

// Find the top navigation components
const HeaderBar = findByName("HeaderBar");
const AppHeaderIcon = findByName("AppHeaderIcon") || findByProps("AppHeaderIcon")?.AppHeaderIcon;
const HeaderBarComponents = findByProps("HeaderBarButton");
const TopNavigation = findByName("TopNavigation") || findByProps("TopNavigation")?.TopNavigation;

// Track patches for cleanup
let unpatchHeader = null;
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

// Create our button component
const ReadAllButton = () => {
    const HeaderBarButton = HeaderBarComponents?.HeaderBarButton;
    
    if (!HeaderBarButton) {
        console.error("HeaderBarButton not found");
        return null;
    }
    
    return React.createElement(HeaderBarButton, {
        onPress: markAllAsRead,
        icon: getAssetIDByName("ic_done_all_24px") || getAssetIDByName("ic_check_24px"),
        activeOpacity: 0.3,
        style: { marginRight: 8 },
        accessibilityLabel: "Mark all as read"
    });
};

// Plugin API exports
export default {
    onLoad: () => {
        try {
            // Approach 1: Using HeaderBar
            if (HeaderBar) {
                unpatchHeader = after("default", HeaderBar, (args, res) => {
                    try {
                        // Find the header buttons container
                        const headerContainer = findInReactTree(res, r => 
                            r?.props?.children?.find?.(c => 
                                c?.props?.accessibilityLabel === "New Group DM" || 
                                c?.props?.accessibilityLabel === "Direct Messages"
                            )
                        );
                        
                        if (headerContainer?.props?.children) {
                            // Add our button after Messages button
                            const messagesButtonIndex = headerContainer.props.children.findIndex(c => 
                                c?.props?.accessibilityLabel === "Direct Messages"
                            );
                            
                            if (messagesButtonIndex !== -1) {
                                // Insert our button after the Messages button
                                headerContainer.props.children.splice(
                                    messagesButtonIndex + 1, 
                                    0, 
                                    React.createElement(ReadAllButton)
                                );
                            } else {
                                // Fallback: Add to the end
                                headerContainer.props.children.push(React.createElement(ReadAllButton));
                            }
                        }
                    } catch (e) {
                        console.error("Error patching HeaderBar:", e);
                    }
                    
                    return res;
                });
                
                console.log("Successfully patched HeaderBar");
                showToast("Read-all plugin loaded", getToastOptions("success"));
            } else if (TopNavigation) {
                // Alternative approach using TopNavigation
                unpatchHeader = after("default", TopNavigation, (args, res) => {
                    try {
                        // Find the actions container
                        const actionsContainer = findInReactTree(res, r => 
                            Array.isArray(r?.props?.children) && 
                            r.props.children.some(c => c?.props?.accessibilityLabel === "Direct Messages")
                        );
                        
                        if (actionsContainer?.props?.children) {
                            // Add our button after Messages
                            const messagesButtonIndex = actionsContainer.props.children.findIndex(c => 
                                c?.props?.accessibilityLabel === "Direct Messages"
                            );
                            
                            if (messagesButtonIndex !== -1) {
                                // Insert after Messages button
                                actionsContainer.props.children.splice(
                                    messagesButtonIndex + 1, 
                                    0, 
                                    React.createElement(ReadAllButton)
                                );
                            } else {
                                // Fallback: Add to the end
                                actionsContainer.props.children.push(React.createElement(ReadAllButton));
                            }
                        }
                    } catch (e) {
                        console.error("Error patching TopNavigation:", e);
                    }
                    
                    return res;
                });
                
                console.log("Using fallback TopNavigation patch");
                showToast("Read-all plugin loaded", getToastOptions("success"));
            } else {
                console.error("Could not find any navigation components to patch");
                showToast("Read-all plugin may not work correctly", getToastOptions("warning"));
            }
        } catch (e) {
            console.error("Error during plugin load:", e);
            showToast("Read-all plugin failed to load correctly", getToastOptions("error"));
        }
    },
    
    onUnload: () => {
        // Clean up patches
        if (unpatchHeader) unpatchHeader();
        showToast("Read-all plugin unloaded", getToastOptions("info"));
    },
    
    settings: Settings
};

// Helper function to find elements in React tree
function findInReactTree(node, predicate) {
    if (predicate(node)) return node;
    if (node?.props?.children) {
        if (Array.isArray(node.props.children)) {
            for (const child of node.props.children) {
                const result = findInReactTree(child, predicate);
                if (result) return result;
            }
        } else {
            const result = findInReactTree(node.props.children, predicate);
            if (result) return result;
        }
    }
    return null;
}
