import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Find ChannelActions object and log its properties to inspect its contents
        const ChannelActions = findByProps("ack", "ackMessage"); // Try with relevant props
        console.log("[Read All] ChannelActions:", ChannelActions); // Inspect ChannelActions object

        if (!ChannelActions) {
            console.error("[Read All] ChannelActions is undefined");
            showToast("Failed to find ChannelActions.", { type: "danger" });
            return;
        }

        // Log all available properties in ChannelActions to understand its structure
        Object.keys(ChannelActions).forEach((key) => {
            console.log(`[Read All] ChannelActions function: ${key}`);
        });

        // Find the function to mark messages as read (this might have a different name)
        if (!ChannelActions?.ack) {
            console.error("[Read All] 'ack' function not found in ChannelActions.");
            showToast("Failed to find 'ack' function in ChannelActions.", { type: "danger" });
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
                                            // Use the correct function after inspecting ChannelActions
                                            // Replace ChannelActions.ack with the correct function if needed
                                            ChannelActions.ack?.(channel.id);  // Replace with the correct method if ack is missing
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
