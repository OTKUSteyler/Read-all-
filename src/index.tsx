import { after } from "@vendetta/patcher";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        console.log("[Read All] Searching for message-related functions...");

        // Find message acknowledgment functions
        const MessageActions = findByProps("ack", "ackMessage", "markRead");
        const ackFunction = MessageActions?.ack ?? MessageActions?.ackMessage ?? MessageActions?.markRead;

        if (!ackFunction) {
            console.error("[Read All] No valid message acknowledgment function found.");
            showToast("Error: No valid message acknowledgment function found.", { type: "danger" });
            return;
        }

        // Find the Guild Store and ensure the UI is present
        const GuildStore = findByStoreName("GuildStore");
        if (!GuildStore) {
            console.error("[Read All] GuildStore not found.");
            showToast("Error: GuildStore missing!", { type: "danger" });
            return;
        }

        const guilds = GuildStore.getGuilds();
        if (!guilds || Object.keys(guilds).length === 0) {
            console.error("[Read All] No servers found.");
            showToast("Error: No servers detected!", { type: "danger" });
            return;
        }

        // Find the component responsible for rendering servers
        const ServerList = findByProps("getGuilds", "getGuildCount");
        if (!ServerList) {
            console.error("[Read All] Server List component not found.");
            showToast("Error: Server List UI missing!", { type: "danger" });
            return;
        }

        // Patch the Server List UI to inject the "Read All" button
        unpatch = after("getGuilds", ServerList, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            const readAllButton = (
                <ReactNative.View style={{ padding: 10, alignItems: "center" }}>
                    <ReactNative.TouchableOpacity
                        onPress={() => {
                            try {
                                console.log("[Read All] Marking all messages as read...");

                                Object.values(guilds).forEach((guild) => {
                                    console.log(`[Read All] Processing guild: ${guild.id}`);

                                    const ChannelStore = findByStoreName("ChannelStore");
                                    if (!ChannelStore) {
                                        console.error("[Read All] ChannelStore not found.");
                                        return;
                                    }

                                    const channels = ChannelStore.getChannels(guild.id);
                                    if (!channels) {
                                        console.error(`[Read All] No channels found for guild ${guild.id}`);
                                        return;
                                    }

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
                            padding: 10,
                            backgroundColor: "#5865F2",
                            borderRadius: 8,
                            alignItems: "center",
                            width: "90%",
                        }}
                    >
                        <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                            📩 Read All Messages
                        </ReactNative.Text>
                    </ReactNative.TouchableOpacity>
                </ReactNative.View>
            );

            // Inject the button at the top of the server list
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
