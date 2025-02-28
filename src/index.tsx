import { React, ReactNative } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { findByName, findByProps } from "@vendetta/metro";
import { logger } from "@vendetta";

const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;

// Find the component responsible for rendering the Guild List
const Guilds = findByName("Guilds", false);
const ChannelStore = findByProps("getUnreadCount", "getLastMessageId");
const SelectedGuildStore = findByProps("getLastSelectedGuildId");

// Function to mark all messages as read
const markAllRead = () => {
    const guildId = SelectedGuildStore.getLastSelectedGuildId();
    if (!guildId) return alert("No server selected!");

    const channels = ChannelStore.getMutableGuildChannels(guildId);
    if (!channels) return alert("No channels found!");

    for (const channelId in channels) {
        ChannelStore.getLastMessageId(channelId); // Simulating marking as read
    }

    alert("✔ All messages marked as read!");
};

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    if (!Guilds) {
        logger.error("❌ Could not find Guilds component!");
        return;
    }

    // Patch the Guilds UI to add a floating button
    unpatch = after("default", Guilds, ([props], res) => {
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

    logger.log("✅ Read All Plugin Loaded!");
};

export const onUnload = () => {
    if (unpatch) unpatch();
};

// Styling for the floating button
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
