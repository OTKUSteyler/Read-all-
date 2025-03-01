import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    const ChannelActions = findByProps("ack", "ackMessage");

    if (!ChannelActions) {
        showToast("Failed to find required Discord functions.", { type: "danger" });
        return;
    }

    // Find the component responsible for the server list
    const GuildsComponent = findByProps("Guilds", "GuildsList");

    if (!GuildsComponent?.Guilds) {
        showToast("Failed to find the server list UI.", { type: "danger" });
        return;
    }

    unpatch = after("Guilds", GuildsComponent, ([props], res) => {
        if (!res?.props?.children) return res;

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
                        const channels = findByProps("getMutableGuilds")?.getMutableGuilds?.();
                        if (!channels) return;

                        Object.keys(channels).forEach((guildId) => {
                            const channelId = channels[guildId]?.channels?.find?.((c) => c.is_read === false)?.id;
                            if (channelId) ChannelActions.ack(channelId);
                        });

                        showToast("All messages marked as read!", { type: "success" });
                    }}
                >
                    <ReactNative.Text style={{ color: "#FFFFFF" }}>📩 Read All Messages</ReactNative.Text>
                </ReactNative.TouchableOpacity>
            </ReactNative.View>
        );

        return res;
    });

    showToast("Read All Messages Button Added to Server List!", { type: "success" });
};

export const onUnload = () => {
    if (unpatch) unpatch();
};

export const settings = Settings;
