import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        showToast("📥 Loading Read All Messages Plugin...", { type: "info" });

        // Find necessary Discord functions
        const ChannelActions = findByProps("ack", "ackMessage");
        if (!ChannelActions) {
            showToast("❌ Failed to find Discord functions.", { type: "danger" });
            return;
        }

        // Default settings: Enable if not set
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Add an overlay button
        const Overlay = findByProps("isOpen", "pushLayer");
        if (!Overlay) {
            showToast("❌ Failed to find overlay UI.", { type: "danger" });
            return;
        }

        unpatch = after("pushLayer", Overlay, ([props], res) => {
            if (!storage.enableReadAll) return res;

            return (
                <>
                    {res}
                    <ReactNative.View
                        style={{
                            position: "absolute",
                            bottom: 50,
                            right: 20,
                            backgroundColor: "#5865F2",
                            padding: 12,
                            borderRadius: 25,
                            alignItems: "center",
                            elevation: 5,
                        }}
                    >
                        <ReactNative.TouchableOpacity
                            onPress={() => {
                                try {
                                    const channels = findByProps("getMutableGuilds")?.getMutableGuilds?.();
                                    if (!channels) return;

                                    Object.keys(channels).forEach((guildId) => {
                                        const channelId = channels[guildId]?.channels?.find?.((c) => !c.is_read)?.id;
                                        if (channelId) ChannelActions.ack(channelId);
                                    });

                                    showToast("✅ All messages marked as read!", { type: "success" });
                                } catch (err) {
                                    console.error("[Read All] Error:", err);
                                    showToast("❌ Error marking messages as read.", { type: "danger" });
                                }
                            }}
                        >
                            <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                                📩 Read All
                            </ReactNative.Text>
                        </ReactNative.TouchableOpacity>
                    </ReactNative.View>
                </>
            );
        });

    } catch (err) {
        console.error("[Read All] Plugin Load Error:", err);
        showToast("❌ Plugin Load Failed!", { type: "danger" });
    }
};

export const onUnload = () => {
    try {
        if (unpatch) {
            unpatch();
            showToast("✅ Plugin Successfully Unloaded!", { type: "success" });
        }
    } catch (err) {
        console.error("[Read All] Unload Error:", err);
        showToast("❌ Error during Unload!", { type: "danger" });
    }
};

export const settings = Settings;
