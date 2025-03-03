import { after } from "@vendetta/patcher";
import { findByStoreName, findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        // Find message-related functions correctly
        const MessageActions = findByProps("ack", "ackMessage", "markRead");
        const ackFunction = MessageActions?.ack ?? MessageActions?.ackMessage ?? MessageActions?.markRead;

        if (!ackFunction) {
            showToast("Error: No valid message acknowledgment function found.", { type: "danger" });
            return;
        }

        // Find GuildStore and ChannelStore properly
        const GuildStore = findByStoreName("GuildStore");
        const ChannelStore = findByStoreName("ChannelStore");

        if (!GuildStore || !ChannelStore) {
            showToast("Error: Guild or Channel store not found!", { type: "danger" });
            return;
        }

        // Find the Guilds component
        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
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
                            const guilds = GuildStore.getGuilds();
                            if (!guilds) {
                                showToast("Error: No guilds found!", { type: "danger" });
                                return;
                            }

                            Object.values(guilds).forEach((guild) => {
                                const channels = ChannelStore.getChannels(guild.id);
                                if (!channels) return;

                                Object.values(channels).forEach((channel) => {
                                    if (!channel.is_read) {
                                        ackFunction(channel.id);
                                    }
                                });
                            });

                            showToast("All messages marked as read!", { type: "success" });
                        } catch {
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

        showToast("Read All plugin loaded successfully!", { type: "success" });
    } catch {
        showToast("Plugin Load Failed!", { type: "danger" });
    }
};

export const onUnload = () => {
    try {
        if (unpatch) {
            unpatch();
            showToast("Plugin Successfully Unloaded!", { type: "success" });
        }
    } catch {
        showToast("Error during Unload!", { type: "danger" });
    }
};

export const settings = Settings;
