import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { registerSettings } from "@vendetta/settings";
import { storage } from "@vendetta/plugin";
import SettingsPage from "./Settings";
import { styles } from "./styles";

// Vendetta UI Components
const { View, TouchableOpacity, Text } = ReactNative;

// Get the mark read function
const { ackMessage } = findByProps("ackMessage");

// Default storage setup
storage.markDMs = storage.markDMs ?? true;

// Function to mark all messages as read
const markAllAsRead = async () => {
    const channels = Object.values(findByProps("getChannel").getMutableChannels());

    for (const channel of channels) {
        // Skip DMs if disabled in settings
        if (!storage.markDMs && channel.type === 1) continue;

        try {
            await ackMessage(channel.id);
        } catch (error) {
            console.error(`[ReadAll] Failed to mark ${channel.id} as read:`, error);
        }
    }
};

// Button Component
const ReadAllButton = () => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
            <Text style={styles.buttonText}>Mark All Read</Text>
        </TouchableOpacity>
    </View>
);

// Register settings page
export const onLoad = () => {
    registerSettings("read-all-settings", SettingsPage);
};

export const onUnload = () => {};
