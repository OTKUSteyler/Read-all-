import { after } from "@vendetta/patcher";
import { findByProps, findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
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

        const QuickSettings = findByName("QuickActions");
        if (!QuickSettings) {
            showToast("Failed to find Quick Settings UI.", { type: "danger" });
            return;
        }

        // Default to enabled if not set
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        unpatch = after("default", QuickSettings, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            res.props.children.unshift(
                <QuickSettings.Button
                    label="📩 Read All"
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
                />
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
