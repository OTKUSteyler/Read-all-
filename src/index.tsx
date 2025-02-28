import { after } from "@vendetta/patcher";
import { findByName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { logger } from "@vendetta";

const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;

// Get the Guilds component (server list)
const Guilds = findByName("Guilds", false);

let unpatch: (() => void) | undefined;

export const onLoad = () => {
    if (!Guilds) {
        logger.error("❌ Could not find Guilds component!");
        return;
    }

    unpatch = after("default", Guilds, ([props], res) => {
        if (!res) return res;

        const ReadAllButton = (
            <TouchableOpacity style={styles.button} onPress={markAllRead}>
                <Text style={styles.text}>✔ Read All</Text>
            </TouchableOpacity>
        );

        res.props.children.unshift(ReadAllButton); // Add to the top of server list
        return res;
    });

    logger.log("✅ Read All Plugin Loaded!");
};

// Function to mark all messages as read
const markAllRead = () => {
    alert("Marked all as read! (Implement actual functionality)");
};

export const onUnload = () => {
    if (unpatch) unpatch();
};

// Styles for the button
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#7289DA", // Discord blurple
        padding: 10,
        borderRadius: 5,
        margin: 5,
        alignItems: "center",
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
