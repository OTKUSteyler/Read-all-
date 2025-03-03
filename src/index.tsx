import { after } from "@vendetta/patcher";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch;

export const onLoad = () => {
    try {
        console.log("[Read All] Loading plugin...");

        // Find the correct function to mark messages as read
        const MessageActions = findByProps("ack") || findByProps("ackMessage") || findByProps("markRead");
        let ackFunction = MessageActions?.ack ?? MessageActions?.ackMessage ?? MessageActions?.markRead;

        if (!ackFunction || typeof ackFunction !== "function") {
            console.error("[Read All] No valid acknowledgment function found.");
            showToast("Error: Message acknowledgment function not found!", { type: "danger" });
            return;
        }

        // Find the Guild Store
        const GuildStore = findByStoreName("GuildStore");
        if (!GuildStore) {
            console.error("[Read All] GuildStore not found.");
            showToast("Error: Guilds not found!", { type: "danger" });
            return;
        }

        // Find the Server List UI Component
        const GuildsComponent = findByProps("Guilds", "GuildsList");
        if (!GuildsComponent?.Guilds) {
            console.error("[Read All] Server list UI missing!");
            showToast("Error: Server list UI missing!", { type: "danger" });
            return;
        }

        console.log("[Read All] Found required components, injecting button...");

        // Patch the server list UI
        unpatch = after("Guilds", GuildsComponent, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            const readAllButton = (
                <ReactNative.TouchableOpacity
                    onPress={() => {
                        try {
                            const guilds = GuildStore.getGuilds();
                            Object.values(guilds).forEach((guild) => {
                                console.log(`[Read All] Processing guild: ${guild.id} - ${guild.name}`);

                                const ChannelStore = findByStoreName("ChannelStore");
                                if (!ChannelStore) {
                                    console.error("[Read All] ChannelStore not found.");
                                    return;
                                }

                                const channels = ChannelStore.getChannels(guild.id);
                                Object.values(channels).forEach((channel) => {
                                    if (!channel.is_read) {
                                        console.log(`[Read All] Marking channel ${channel.id} as read.`);
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

        console.log("[Read All] Plugin loaded successfully.");
    } catch (err) {
        console.error("[Read All] Plugin Load Error:", err);
        showToast("Plugin Load Failed!", { type: "danger" });
    }
};

export const onUnload = () => {
    if (unpatch) {
        unpatch();
        showToast("Plugin Successfully Unloaded!", { type: "success" });
    }
};

export const settings = Settings;
