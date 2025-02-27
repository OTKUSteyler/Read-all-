import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { ReactNative, React } from "@vendetta/metro/common";
import SettingsPage from "./Settings";

// UI Components
const { View, TouchableOpacity, Text, Alert, StyleSheet } = ReactNative;

// Ensure storage is initialized
storage.readDMs = storage.readDMs ?? true;

// Fetch Discord's unread message functions
const unreadStore = findByProps("getUnreadCount", "hasUnread");
const readAllMessages = findByProps("ack", "ackCategory");
const navigation = findByProps("NavigationContainer");

// Check if functions exist
if (!unreadStore || !readAllMessages) {
    console.error("[ReadAll] Missing required functions!");
}

// Function to mark all messages as read
const markAllAsRead = () => {
    if (!unreadStore || !readAllMessages) {
        Alert.alert("Error", "Required functions are missing!");
        return;
    }

    // Get all unread guilds and DMs
    const unreadGuilds = unreadStore.getUnreadGuilds();
    const unreadDMs = unreadStore.getUnreadPrivateChannels();

    // Mark all servers as read
    for (const guildId of Object.keys(unreadGuilds)) {
        readAllMessages.ack(guildId);
    }

    // Optionally mark DMs as read
    if (storage.readDMs) {
        for (const dmId of Object.keys(unreadDMs)) {
            readAllMessages.ack(dmId);
        }
    }

    Alert.alert("Success", "All unread messages marked as read!");
};

// UI Button Component
const ReadAllButton = () => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
                <Text style={styles.buttonText}>Read All</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles for the button
const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        top: 50,
        left: 10,
        zIndex: 100,
    },
    button: {
        backgroundColor: "#7289DA",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

// Inject button into navigation UI
let patch;
export const onLoad = () => {
    registerSettings("read-all-settings", SettingsPage);

    patch = after("render", navigation.default, (_, res) => {
        if (!res) return res;
        return (
            <>
                {res}
                <ReadAllButton />
            </>
        );
    });
};

export const onUnload = () => {
    if (patch) patch();
};
