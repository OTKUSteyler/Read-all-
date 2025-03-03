import { after } from "@vendetta/patcher";
import { findByProps, findByStoreName, findByName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    try {
        console.log("[Read All] 🔍 Searching for message functions...");

        // Find MessageActions
        const MessageActions = findByProps("ack") || findByProps("ackMessage") || findByProps("markRead");
        if (!MessageActions) {
            console.error("[Read All] ❌ MessageActions not found.");
            showToast("Error: Message functions not found!", { type: "danger" });
            return;
        }

        const ackFunction = MessageActions.ack || MessageActions.ackMessage || MessageActions.markRead;
        if (!ackFunction) {
            console.error("[Read All] ❌ No valid function for marking messages as read.");
            showToast("Error: No valid acknowledgment function!", { type: "danger" });
            return;
        }

        // Get Stores
        const GuildStore = findByStoreName("GuildStore");
        const ChannelStore = findByStoreName("ChannelStore");

        if (!GuildStore || !ChannelStore) {
            console.error("[Read All] ❌ GuildStore or ChannelStore missing.");
            showToast("Error: Guilds/channels not found!", { type: "danger" });
            return;
        }

        // Find UI Component
        const GuildsComponent = findByName("Guilds");
        if (!GuildsComponent) {
            console.error("[Read All] ❌ Could not find 'Guilds' UI component.");
            showToast("Error: Server list UI missing!", { type: "danger" });
            return;
        }

        console.log("[Read All] ✅ Found UI Component, injecting button...");

        // Ensure default setting
        if (storage.enableReadAll === undefined) {
            storage.enableReadAll = true;
        }

        // Patch UI
        unpatch = after("default", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            const readAllButton = (
                <ReactNative.TouchableOpacity
                    onPress={() => {
                        try {
                            console.log("[Read All] Fetching all guilds...");
                            const guilds = GuildStore.getGuilds();
                            if (!guilds || Object.keys(guilds).length === 0) {
                                console.error("[Read All] ❌ No guilds found.");
                                showToast("Error: No guilds available!", { type: "danger" });
                                return;
                            }

                            Object.values(guilds).forEach((guild) => {
                                console.log(`[Read All] Processing ${guild.name} (${guild.id})`);
                                const channels = ChannelStore.getChannels(guild.id);
                                if (!channels || Object.keys(channels).length === 0) {
                                    console.warn(`[Read All] ⚠️ No channels for ${guild.name}`);
                                    return;
                                }

                                Object.values(channels).forEach((channel) => {
                                    if (!channel.is_read) {
                                        console.log(`[Read All] ✅ Marking ${channel.id} as read.`);
                                        ackFunction(channel.id);
                                    }
                                });
                            });

                            showToast("All messages marked as read!", { type: "success" });
                        } catch (err) {
                            console.error("[Read All] ❌ Error marking messages as read:", err);
                            showToast("Error marking messages!", { type: "danger" });
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

        console.log("[Read All] ✅ Plugin loaded.");
    } catch (err) {
        console.error("[Read All] ❌ Plugin Load Error:", err);
        showToast("Plugin Load Failed!", { type: "danger" });
    }
};

export const onUnload = () => {
    try {
        if (unpatch) {
            unpatch();
            showToast("Plugin Unloaded!", { type: "success" });
        }
    } catch (err) {
        console.error("[Read All] ❌ Unload Error:", err);
        showToast("Error during Unload!", { type: "danger" });
    }
};

export const settings = Settings;
