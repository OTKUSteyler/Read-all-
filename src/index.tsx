import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { styles } from "./styles"; // ✅ Use styles.ts instead of CSS
import SettingsPage from "./Settings";

const { View, TouchableOpacity, Text, Alert } = ReactNative;
const { markChannelAsRead } = findByProps("markChannelAsRead");

// Function to mark all channels as read
const markAllAsRead = () => {
    Alert.alert(
        "Confirm",
        "Are you sure you want to mark all messages as read?",
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "Yes",
                onPress: () => {
                    // Simulate marking channels as read (replace with real implementation)
                    console.log("Marked all channels as read.");
                },
            },
        ]
    );
};

// Button Component
const ReadAllButton = () => {
    return (
        <View style={{ position: "absolute", top: 10, left: 10 }}>
            <TouchableOpacity style={styles.readAllButton} onPress={markAllAsRead}>
                <Text style={styles.readAllText}>Mark All as Read</Text>
            </TouchableOpacity>
        </View>
    );
};

// Register the settings page
export const onLoad = () => {
    registerSettings("read-all-settings", SettingsPage);
};

export const onUnload = () => {};
