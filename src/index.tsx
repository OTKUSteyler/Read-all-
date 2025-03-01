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

    // Patch the server list UI
    const GuildsList = findByProps("GuildsList");
    if (!GuildsList) {
        showToast("Failed to find GuildsList.", { type: "danger" });
        return;
    }

    unpatch = after("default", GuildsList, ([props], res) => {
        if (!res?.props?.children) return res;

        res.props.children.unshift(
            <ReactNative.TouchableOpacity
                style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: "#5865F2",
                    borderRadius: 8,
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
                <ReactNative.Text style={{ color: "#FFF", textAlign: "center" }}>Read All</ReactNative.Text>
            </ReactNative.TouchableOpacity>
        );

        return res;
    });

    showToast("Read All Messages Button Added!", { type: "success" });
};

export const onUnload = () => {
    if (unpatch) unpatch();
};

export const settings = Settings;
