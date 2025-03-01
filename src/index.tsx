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

        // Find Discord functions
        const ChannelActions = findByProps("ack", "ackMessage");
        if (!ChannelActions || !ChannelActions.ack) {
            showToast("Failed to find Discord message functions.", { type: "danger" });
            console.error("[Read All] Missing ack function in ChannelActions:", ChannelActions);
            return;
        }

        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            showToast("Failed to find the server list UI.", { type: "danger" });
            return;
        }

        // Default setting
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch UI to add overlay button
        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            res.props.children.unshift(
                <ReactNative.View style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#5865F2",
                    padding: 12,
                    borderRadius: 8,
                    elevation: 5, // Adds shadow for better visibility
                    alignItems: "center"
                }}>
                    <ReactNative.TouchableOpacity
                        onPress={() => {
                            try {
                                const channels = findByProps("getMutableGuilds")?.getMutableGuilds?.();
                                if (!channels) return;

                                Object.keys(channels).forEach((guildId) => {
                                    const unreadChannel = channels[guildId]?.channels?.find?.((c) => !c.is_read);
                                    if (unreadChannel?.id) {
                                        ChannelActions.ack(unreadChannel.id);
                                    }
                                });

                                showToast("All messages marked as read!", { type: "success" });
                            } catch (err) {
                                console.error("[Read All] Error marking messages:", err);
                                showToast("Error marking messages as read.", { type: "danger" });
                            }
                        }}
                    >
                        <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                            📩 Read All
                        </ReactNative.Text>
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
