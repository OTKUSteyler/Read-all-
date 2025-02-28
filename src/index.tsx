import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { logger } from "@vendetta";

// UI Components
const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;

// Find the correct Guilds Component
const Guilds = findByProps("Guilds", "UnreadBadges");
const ChannelStore = findByProps("getUnreadCount", "getLastMessageId");
const SelectedGuildStore = findByProps("getLastSelectedGuildId");

if (!Guilds) {
    logger.error("❌ Could not find Guilds component!");
}

const markAllRead = () => {
    const guildId = SelectedGuildStore.getLastSelectedGuildId();
    if (!guildId) {
        alert("⚠ No server selected!");
        return;
    }

    const channels = ChannelStore.getMutableGuildChannels(guildId);
    if (!channels) {
        alert("⚠ No unread messages found!");
        return;
    }

    for (const channelId in channels) {
        ChannelStore.getLastMessageId(channelId);
    }

    alert("✅ All messages marked as read!");
};

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    logger.log("✅ Read All Plugin Loaded!");

    if (!Guilds) return;

    // Patch the Guilds UI to add the button
    unpatch = after("default", Guilds, ([props], res) => {
        logger.log("✅ Guilds UI patched!");

        if (!res) return res;

        const FloatingButton = () => (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={markAllRead}>
                    <Text style={styles.text}>📩 Read All</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <>
                {res}
                <FloatingButton />
            </>
        );
    });
};

export const onUnload = () => {
    if (unpatch) unpatch();
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 100,
        right: 20,
        backgroundColor: "#5865F2",
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
    button: {
        padding: 10,
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});
