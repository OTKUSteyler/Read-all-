import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Attempting to find ChannelActions or any relevant action related to message acknowledgment
        const ChannelActions = findByProps("ack", "ackMessage", "messages", "markRead", "channelActions");

        console.log("[Read All] ChannelActions object:", ChannelActions);  // Log the result for debugging

        // Log everything that could be related to marking messages as read
        const allActions = findByProps("ack", "ackMessage", "messages", "markRead", "channelActions");
        console.log("[Read All] All available actions related to message ack:", allActions);

        // Check if ChannelActions and ack are found, else log all related functions
        if (!allActions) {
            console.error("[Read All] Failed to find any message actions.");
            showToast("Error: Failed to find any message actions.", { type: "danger" });
            return;
        }

        if (!ChannelActions?.ack) {
            console.error("[Read All] 'ack' method not found in ChannelActions.");
            showToast("Error: Could not find 'ack' method.", { type: "danger" });
            return;
        }

        // Find the component responsible for rendering the server list
        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            console.error("[Read All] 'Guilds' component not found in GuildsComponent:", GuildsComponent);
            showToast("Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Set default setting if not already set
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch the Guilds component to add the "Read All" button
        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            // Create the "Read All" button
            const readAllButton = (
                <ReactNative.TouchableOpacity
                    onPress={() => {
                        try {
                            const guilds = findByProps("getGuilds")?.getGuilds?.();
                            if (!guilds) {
                                console.error("[Read All] No guilds found.");
                                return;
                            }

                            Object.values(guilds).forEach((guild) => {
                                const channels = guild.channels;
                                if (channels) {
                                    Object.values(channels).forEach((channel) => {
                                        if (!channel.is_read) {
                                            console.log(`[Read All] Marking channel ${channel.id} as read.`);
                                            
                                            // Check for all possible methods to mark the message as read
                                            if (ChannelActions?.ack) {
                                                ChannelActions.ack(channel.id);  // Try the ack method if it exists
                                            } else if (ChannelActions?.ackMessage) {
                                                ChannelActions.ackMessage(channel.id);  // Check for ackMessage if available
                                            } else if (ChannelActions?.markRead) {
                                                ChannelActions.markRead(channel.id);  // Try markRead as a fallback
                                            } else {
                                                console.error("[Read All] No suitable method found to mark message as read.");
                                                showToast("Error: Could not find method to mark messages as read.", { type: "danger" });
                                            }
                                        }
                                    });
                                }
                            });

                            showToast("All messages marked as read!", { type: "success" });
                        } catch (err) {
                            console.error("[Read All] Error marking messages as read:", err);
                            showToast("Error marking messages as read.", { type: "danger" });
                        }
                    }}
                    style={{
                        marginBottom: 10,
                        padding: 10,
                        backgroundColor: "#5865F2",
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        📩 Read All
                    </ReactNative.Text>
                </ReactNative.TouchableOpacity>
            );

            // Insert the button at the top of the server list
            res.props.children.unshift(readAllButton);

            return res;
        });

        console.log("[Read All] Plugin loaded successfully.");
    } catch (err) {
        console.error("[Read All] Plugin Load Error:", err);
        showToast("Plugin Load Failed!", { type: "danger" });
    }
};

export const onUnload = () => {
    try {
        if (unpatch) {
            unpatch();
            showToast("Plugin Successfully Unloaded!", { type: "success" });
        }
    } catch (err) {
        console.error("[Read All] Unload Error:", err);
        showToast("Error during Unload!", { type: "danger" });
    }
};

export const settings = Settings;
