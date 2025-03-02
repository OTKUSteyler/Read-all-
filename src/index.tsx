import { after } from "@vendetta/patcher";
import { findByProps, findByName, metro } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Debugging: Search for message-related actions
        console.log("[Read All] Searching for message-related properties...");

        // Attempt to locate message-related actions using known properties
        let MessageActions = findByProps("ack", "ackMessage", "acknowledge", "markRead");
        if (!MessageActions) MessageActions = findByName("MessageActions");

        console.log("[Read All] Found MessageActions:", MessageActions);

        if (!MessageActions) {
            console.error("[Read All] Failed to find message-related actions.");
            showToast("Error: Could not find message-related actions.", { type: "danger" });

            // Attempt a manual scan for debugging
            Object.values(metro.modules).forEach((mod) => {
                if (mod?.exports) {
                    const keys = Object.keys(mod.exports);
                    if (keys.some((key) => key.includes("ack") || key.includes("read") || key.includes("message"))) {
                        console.log("[Debug] Possible module found:", keys);
                    }
                }
            });

            return;
        }

        // Identify the correct function for marking messages as read
        const ackFunction = MessageActions.ack || MessageActions.ackMessage || MessageActions.acknowledge || MessageActions.markRead;

        if (!ackFunction) {
            console.error("[Read All] No valid function found for marking messages as read.");
            showToast("Error: No valid function found for marking messages as read.", { type: "danger" });
            return;
        }

        console.log("[Read All] Successfully found message acknowledgment function:", ackFunction);

        // Find the Guilds component for rendering the server list
        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            console.error("[Read All] 'Guilds' component not found in GuildsComponent:", GuildsComponent);
            showToast("Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Set default setting
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch the Guilds component to add the "Read All" button
        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

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
                                            ackFunction(channel.id);
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
