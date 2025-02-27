import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { ReactNative } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { styles } from "./styles";
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
                onPress: async () => {
                    const channels = findByProps("getSortedGuildChannels").getSortedGuildChannels();
                    Object.keys(channels).forEach((channelId) => {
                        markChannelAsRead(channelId);
                    });
                    console.log("[ReadAll] Marked all messages as read.");
                },
            },
        ]
    );
};

// Button Component (Injected into Navigation)
const injectButton = () => {
    const NavigationBar = findByName("NavigationBar", false);
    if (!NavigationBar) return console.error("[ReadAll] NavigationBar not found!");

    return before("render", NavigationBar.prototype, (args, res) => {
        res.props.children.push(
            <TouchableOpacity style={styles.readAllButton} onPress={markAllAsRead}>
                <Text style={styles.readAllText}>Mark All</Text>
            </TouchableOpacity>
        );
    });
};

// Register the settings page and button injection
let unpatch: () => void;
export const onLoad = () => {
    registerSettings("read-all-settings", SettingsPage);
    unpatch = injectButton();
};

export const onUnload = () => {
    if (unpatch) unpatch();
};
