import { after } from "@vendetta/patcher";
import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import Settings from "./Settings";
import "./style.css";

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
            const channels = Object.keys(UnreadStore.getUnreadChannels());
            channels.forEach((channel) => {
                if (storage.markDMs || !UnreadStore.getChannel(channel).isDM) {
                    UnreadStore.markChannelRead(channel);
                }
            });

            console.log("[ReadAll] Marked all messages as read.");
        }}
    >
        <Text className="read-all-text">Read All</Text>
    </TouchableOpacity>
);

let unpatch;
export const onLoad = () => {
    console.log("[ReadAll] Plugin is loading...");
    registerSettings("readall-settings", Settings);

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
