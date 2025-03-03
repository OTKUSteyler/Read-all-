import { after } from "@vendetta/patcher";
import { findByProps, findByStoreName, findByName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        console.log("[Read All] Initializing...");

        // Get MessageActions correctly
        const MessageActions = findByProps("ack") || findByProps("ackMessage") || findByProps("markRead");
        if (!MessageActions) {
            console.error("[Read All] MessageActions not found!");
            showToast("Error: Message functions not found!", { type: "danger" });
            return;
        }

        const ackFunction = MessageActions.ack || MessageActions.ackMessage || MessageActions.markRead;
        if (!ackFunction) {
            console.error("[Read All] No valid message acknowledgment function found.");
            showToast("Error: No valid message acknowledgment function found.", { type: "danger" });
            return;
        }

        // Get Guild and Channel store properly
        const GuildStore = findByStoreName("GuildStore");
        const ChannelStore = findByStoreName("ChannelStore");

        if (!GuildStore || !ChannelStore) {
            console.error("[Read All] GuildStore or ChannelStore not found.");
            showToast("Error: Could not fetch guild/channel data!", { type: "danger" });
            return;
        }

        // Find the UI component correctly
        const GuildsComponent = findByName("Guilds");
        if (!GuildsComponent) {
            console.error("[Read All] 'Guilds' component not found.");
            showToast("Error: Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Ensure storage default value
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch the UI to add the "Read All" button
        unpatch = after("default", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            const readAllButton = (
                <ReactNative.TouchableOpacity
                    onPress={() => {
                        try {
                            console.log("[Read All] Fetching all guilds...");
                            const guilds = GuildStore.getGuilds();
                            if (!guilds) {
                                console.error("[Read All] No guilds found.");
                                showToast("Error: No guilds found!", { type: "danger" });
                                return;
                            }

                            Object.values(guilds).forEach((guild) => {
                                console.log(`[Read All] Processing guild: ${guild.id} - ${guild.name}`);
                                const channels = ChannelStore.getChannels(guild.id);
                                if (!channels) return;

                                Object.values(channels).forEach((channel) => {
                                    if (!channel.is_read) {
                                        ackFunction(channel.id);
                                    }
                                });
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

            // Add button to UI
            res.props.children = [readAllButton, ...res.props.children];

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
