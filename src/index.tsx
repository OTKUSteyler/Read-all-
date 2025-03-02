import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Searching for any message-related actions or functions in different parts of Vendetta
        const messageActions = findByProps("ack", "markRead", "message", "acknowledge", "messages");
        
        console.log("[Read All] All available message actions:", messageActions); // Log the result for debugging

        // Check if messageActions is found, if not, log a different message
        if (!messageActions) {
            console.error("[Read All] Failed to find any message-related actions.");
            showToast("Error: Failed to find any message-related actions.", { type: "danger" });
            return;
        }

        // If we found something, check for the necessary method to mark messages as read
        if (!messageActions?.ack && !messageActions?.acknowledge && !messageActions?.markRead) {
            console.error("[Read All] No valid method to acknowledge messages.");
            showToast("Error: Could not find a valid method to acknowledge messages.", { type: "danger" });
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
                                            
                                            // Try to call the correct function based on what we've found
                                            if (messageActions?.ack) {
                                                messageActions.ack(channel.id);  // Try ack method if found
                                            } else if (messageActions?.acknowledge) {
                                                messageActions.acknowledge(channel.id);  // Try acknowledge method if found
                                            } else if (messageActions?.markRead) {
                                                messageActions.markRead(channel.id);  // Try markRead method if found
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
