import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        showToast("Loading Read All Messages Plugin...", { type: "info" });

        const ChannelActions = findByProps("ack", "ackMessage");
        if (!ChannelActions) {
            showToast("Failed to find Discord functions.", { type: "danger" });
            return;
        }

        const GuildsComponent = findByProps("Guilds", "GuildsList");
        console.log("[Read All] GuildsComponent:", GuildsComponent);

        if (!GuildsComponent?.Guilds) {
            showToast("Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Default to enabled if not set
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            res.props.children.unshift(
                <ReactNative.View style={{ padding: 10 }}>
                    <ReactNative.TouchableOpacity
                        style={{
                            backgroundColor: "#5865F2",
                            padding: 10,
                            borderRadius: 5,
                            alignItems: "center",
                        }}
                        onPress={() => {
                            try {
                                const channels = findByProps("getMutableGuilds")?.getMutableGuilds?.();
                                if (!channels) return;

                                Object.keys(channels).forEach((guildId) => {
                                    const channelId = channels[guildId]?.channels?.find?.((c) => c.is_read === false)?.id;
                                    if (channelId) ChannelActions.ack(channelId);
                                });

                                showToast("All messages marked as read!", { type: "success" });
                            } catch (err) {
                                console.error("[Read All] Error:", err);
                                showToast("Error marking messages as read.", { type: "danger" });
                            }
                        }}
                    >
                        <ReactNative.Text style={{ color: "#FFFFFF" }}>📩 Read All Messages</ReactNative.Text>
                    </ReactNative.TouchableOpacity>
                </ReactNative.View>
            );

            return res;
        });

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
