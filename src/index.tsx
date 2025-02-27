import { after } from "@vendetta/patcher";
import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import "@vendetta/ui/styles"; // Ensures Vendetta supports custom styles
import "./style.css"; // Import the CSS file

const { View, TouchableOpacity, Text } = ReactNative;
const UnreadStore = findByProps("markChannelRead");

const ReadAllButton = () => (
    <TouchableOpacity
        className="read-all-button"
        onPress={() => {
            if (!UnreadStore?.markChannelRead) {
                console.error("[ReadAll] markChannelRead is missing!");
                return;
            }
            console.log("[ReadAll] Marking all as read...");
            // Call markChannelRead function here for each unread channel
        }}
    >
        <Text className="read-all-text">Read All</Text>
    </TouchableOpacity>
);

let unpatch;
export const onLoad = () => {
    console.log("[ReadAll] Plugin is loading...");

    try {
        unpatch = after("default", findByProps("UnreadBadge"), (_args, res) => {
            if (!res?.props?.children || !Array.isArray(res.props.children)) return res;
            res.props.children.unshift(<ReadAllButton key="read-all-button" />);
            return res;
        });
        console.log("[ReadAll] Button should now appear.");
    } catch (error) {
        console.error("[ReadAll] Error adding button:", error);
    }
};

export const onUnload = () => {
    if (unpatch) unpatch();
};
