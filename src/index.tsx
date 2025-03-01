import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";

// Track unpatch function
let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        showToast("🔄 Loading Read All Messages Plugin...", { type: "info" });

        // Debug: Log available functions
        console.log("[Read All] 🔍 Searching for Discord functions...");

        // Find the correct Discord functions
        const ChannelActions = findByProps("bulkAck", "ack", "ackMessage", "setReadState");

        if (!ChannelActions || typeof ChannelActions.ack !== "function") {
            console.log("[Read All] ❌ Could not find `ack` function.");
            showToast("❌ Discord function lookup failed! Plugin may not work.", { type: "danger" });
            return;
        }

        console.log("[Read All] ✅ Found Discord functions:", ChannelActions);

        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            showToast("❌ Failed to find the server list UI.", { type: "danger" });
            return;
        }

        console.log("[Read All] ✅ Found Guilds UI component.");

        // Default to enabled if not set
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch the UI
        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            res.props.children.unshift(
                <ReactNative.View style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#5865F2",
                    padding: 12,
                    borderRadius: 50,
                    alignItems: "center",
                    elevation: 5, // Shadow effect
                }}>
                    <ReactNative.TouchableOpacity
                        onPress={() => {
                            try {
                                console.log("[Read All] 📨 Marking all messages as read...");
                                const channels = findByProps("getMutableGuilds")?.getMutableGuilds?.();
                                if (!channels) return;

                                Object.keys(channels).forEach((guildId) => {
                                    const channelId = channels[guildId]?.channels?.find?.((c) => c.is_read === false)?.id;
                                    if (channelId) ChannelActions.ack(channelId);
                                });

                                showToast("✅ All messages marked as read!", { type: "success" });
                            } catch (err) {
                                console.error("[Read All] ❌ Error:", err);
                                showToast("❌ Error marking messages as read.", { type: "danger" });
                            }
                        }}
                    >
                        <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>📩</ReactNative.Text>
                    </ReactNative.TouchableOpacity>
                </ReactNative.View>
            );

            return res;
        });

        console.log("[Read All] ✅ Plugin loaded successfully.");

    } catch (err) {
        console.error("[Read All] ❌ Plugin Load Error:", err);
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
        console.error("[Read All] ❌ Unload Error:", err);
        showToast("❌ Error during Unload!", { type: "danger" });
    }
};

// Attach settings menu
export const settings = Settings;
