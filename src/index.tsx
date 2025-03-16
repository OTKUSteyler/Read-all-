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

// Find server list components
const GuildListComponent = findByProps("GuildList")?.GuildList || findByName("GuildList");
const GuildItem = findByProps("GuildIcon")?.GuildIcon || findByName("GuildIcon");
const HomeButton = findByProps("HomeButton")?.HomeButton || findByName("HomeButton");
const GuildListDivider = findByProps("GuildListDivider")?.GuildListDivider || findByName("GuildListDivider");

// Track patches for cleanup
let unpatchGuildList = null;
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

// Create our custom server-like button component
const ReadAllButton = (props) => {
    const styles = {
        container: {
            width: 48, 
            height: 48,
            borderRadius: 24,
            backgroundColor: "#5865F2",  // Discord blurple color
            marginBottom: 8,
            marginTop: 8,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        },
        icon: {
            width: 24,
            height: 24,
            color: "#FFFFFF"
        }
    };

    // Get various icons we can use
    const checkIcon = getAssetIDByName("ic_done_all_24px") || 
                     getAssetIDByName("ic_check_24px") || 
                     getAssetIDByName("debug") ||
                     getAssetIDByName("ic_message_check");
    
    // For Pressable component
    const Pressable = findByName("Pressable") || 
                     findByProps("Pressable")?.Pressable ||
                     (props => React.createElement("button", props));

    // For Icon component
    const Icon = findByName("Icon") || 
                findByProps("Icon")?.Icon;

    return React.createElement(
        Pressable, 
        {
            style: styles.container,
            onPress: markAllAsRead,
            accessibilityLabel: "Mark all as read"
        },
        Icon 
            ? React.createElement(Icon, {
                source: checkIcon,
                style: styles.icon
            })
            : null
    );
};

// Plugin API exports
export default {
    onLoad: () => {
        try {
            // Patch the Guild List to add our button
            if (GuildListComponent) {
                unpatchGuildList = after("default", GuildListComponent, (args, res) => {
                    try {
                        // Find the guilds container
                        const guildsContainer = findInReactTree(res, r => 
                            Array.isArray(r?.props?.children) && 
                            r.props.children.some(c => c?.type?.name === "HomeButton" || c?.type?.displayName === "HomeButton")
                        );
                        
                        if (guildsContainer?.props?.children) {
                            // Check if we've already added our button
                            const alreadyAddedButton = guildsContainer.props.children.some(
                                c => c?.key === "read-all-button" || c?.props?.accessibilityLabel === "Mark all as read"
                            );
                            
                            if (!alreadyAddedButton) {
                                // Find where to insert our button (after Home button and divider)
                                const homeButtonIndex = guildsContainer.props.children.findIndex(
                                    c => c?.type?.name === "HomeButton" || c?.type?.displayName === "HomeButton"
                                );
                                
                                const dividerIndex = guildsContainer.props.children.findIndex(
                                    c => c?.type?.name === "GuildListDivider" || c?.type?.displayName === "GuildListDivider"
                                );
                                
                                const insertIndex = Math.max(homeButtonIndex, dividerIndex) + 1;
                                
                                if (insertIndex > 0) {
                                    // Create our button element
                                    const readAllButtonElement = React.createElement(ReadAllButton, { key: "read-all-button" });
                                    
                                    // Add a divider before our button
                                    const dividerElement = React.createElement(GuildListDivider || "div", { 
                                        key: "read-all-divider",
                                        style: { marginTop: 8, marginBottom: 8 }
                                    });
                                    
                                    // Insert divider and our button
                                    guildsContainer.props.children.splice(insertIndex, 0, dividerElement, readAllButtonElement);
                                } else {
                                    // Fallback: add to beginning of list
                                    guildsContainer.props.children.unshift(React.createElement(ReadAllButton, { key: "read-all-button" }));
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Error patching GuildList:", e);
                    }
                    
                    return res;
                });
                
                console.log("Successfully patched GuildList");
                showToast("Read-all plugin loaded", getToastOptions("success"));
            } else {
                console.error("Could not find GuildList component to patch");
                showToast("Read-all plugin may not work correctly", getToastOptions("warning"));
            }
        } catch (e) {
            console.error("Error during plugin load:", e);
            showToast("Read-all plugin failed to load correctly", getToastOptions("error"));
        }
    },
    
    onUnload: () => {
        // Clean up patches
        if (unpatchGuildList) unpatchGuildList();
        showToast("Read-all plugin unloaded", getToastOptions("info"));
    },
    
    settings: Settings
};

// Helper function to find elements in React tree
function findInReactTree(node, predicate) {
    if (!node) return null;
    if (predicate(node)) return node;
    
    if (node?.props?.children) {
        if (Array.isArray(node.props.children)) {
            for (const child of node.props.children) {
                const result = findInReactTree(child, predicate);
                if (result) return result;
            }
        } else if (typeof node.props.children === 'object') {
            return findInReactTree(node.props.children, predicate);
        }
    }
    
    return null;
}
