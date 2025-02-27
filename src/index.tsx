import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { findByProps } from "@vendetta/metro";
import { ReactNative } from "@vendetta/metro/common";
import SettingsPage from "./Settings";

// UI Components
const { View, TouchableOpacity, Text, Alert } = ReactNative;

// Ensure storage is initialized
storage.readDMs = storage.readDMs ?? true;

// Fetch Discord's unread message functions
const unreadStore = findByProps("getUnreadCount", "hasUnread");
const readAllMessages = findByProps("ack", "ackCategory");

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
        <View style={{ position: "absolute", top: 10, left: 10, zIndex: 100 }}>
            <TouchableOpacity
                style={{
                    backgroundColor: "#7289DA",
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={markAllAsRead}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Read All</Text>
            </TouchableOpacity>
        </View>
    );
};

// Register settings and add button
export const onLoad = () => {
    registerSettings("read-all-settings", SettingsPage);
};

export const onUnload = () => {};
export default ReadAllButton;
