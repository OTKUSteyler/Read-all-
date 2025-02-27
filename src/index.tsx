import { after } from "@vendetta/patcher";
import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";

const { View, TouchableOpacity, Text } = ReactNative;
const UnreadStore = findByProps("markChannelRead");

const ReadAllButton = () => (
    <TouchableOpacity
        style={{
            padding: 10,
            backgroundColor: "#7289DA",
            borderRadius: 5,
            alignItems: "center",
        }}
        onPress={() => {
            if (!UnreadStore?.markChannelRead) {
                console.error("[ReadAll] markChannelRead is missing!");
                return;
            }
            console.log("[ReadAll] Marking all as read...");
            // Mark all channels as read
        }}
    >
        <Text style={{ color: "white", fontWeight: "bold" }}>Read All</Text>
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
