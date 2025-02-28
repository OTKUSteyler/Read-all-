import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { findByProps } from "@vendetta/metro";
import { logger } from "@vendetta";
import Settings from "./Settings";

// Vendetta API modules  
const { View, TouchableOpacity, Text, Alert } = ReactNative;
const { markChannelAsRead } = findByProps("markChannelAsRead");

export const onLoad = () => {
    logger.log("✅ Read All Plugin Loaded!");

    registerSettings("read-all-settings", Settings);
};

export const onUnload = () => {
    logger.log("❌ Read All Plugin Unloaded!");
};

// UI Button Component
const ReadAllButton = () => {
    const handlePress = () => {
        Alert.alert("Mark All as Read", "Feature not fully implemented yet.");
        // Future: Implement mark all as read logic
    };

    return (
        <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Mark All as Read</Text>
            </TouchableOpacity>
        </View>
    );
};

// Render Button (if necessary, attach it properly)
export default ReadAllButton;
