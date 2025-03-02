import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings"; // Import the settings file

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Try to find all message-related methods dynamically
        const messageActions = findByProps("messages", "acknowledge", "channel", "messageActions", "markRead");
        console.log("[Read All] Message Actions found:", messageActions); // Log all available methods

        // If no methods were found, show an error
        if (!messageActions) {
            console.error("[Read All] Failed to find any message-related properties.");
            showToast("Error: Failed to find any message-related actions.", { type: "danger" });
            return;
        }

        // Log all the methods available on messageActions
        console.log("[Read All] All methods found in messageActions:", Object.keys(messageActions));

        // Check if any valid method to acknowledge messages exists
        const ackFunction = messageActions.ack || messageActions.acknowledge || messageActions.markRead;
        if (!ackFunction) {
            console.error("[Read All] No valid method for marking messages as read.");
            showToast("Error: Could not find valid method for marking messages as read.", { type: "danger" });
            return;
        }

        // Find the Guilds component for rendering the server list
        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            console.error("[Read All] 'Guilds' component not found in GuildsComponent:", GuildsComponent);
            showToast("Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Set the default setting for "Read All"
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
                                            
                                            // Try to call the appropriate function for acknowledgment
                                            if (ackFunction) {
                                                ackFunction(channel.id);  // Use the first found method
                                            } else {
                                                console.error("[Read All] No suitable method found.");
                                                showToast("Error: No valid method to mark messages as read.", { type: "danger" });
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
