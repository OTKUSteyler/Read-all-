import { React } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./Settings";
import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { View, TouchableOpacity, Text, Alert } from "react-native";

// Find Discord API methods
const markRead = findByProps("ack", "markChannelRead")?.markChannelRead;
const getGuilds = findByProps("getGuilds")?.getGuilds;
const getSortedPrivateChannels = findByProps("getSortedPrivateChannels")?.getSortedPrivateChannels;

// Ensure storage has default values
storage.includeDMs ??= true;

let patches: (() => void)[] = [];

const markAllAsRead = () => {
  if (!markRead || !getGuilds) {
    Alert.alert("Error", "Unable to mark messages as read. Discord API changed.");
    return;
  }

  // Mark all servers as read
  const guilds = Object.keys(getGuilds());
  guilds.forEach((guildId) => markRead(guildId));

  // Mark DMs if enabled
  if (storage.includeDMs && getSortedPrivateChannels) {
    const dms = getSortedPrivateChannels();
    dms.forEach((dm) => markRead(dm.channel.id));
  }

  Alert.alert("Success", "All messages marked as read!");
};

// Floating button component
const MarkAllButton = () => (
  <View style={{ position: "absolute", top: 40, left: 10, zIndex: 999 }}>
    <TouchableOpacity
      style={{
        backgroundColor: "#7289DA",
        padding: 10,
        borderRadius: 5,
      }}
      onPress={markAllAsRead}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Mark All Read</Text>
    </TouchableOpacity>
  </View>
);

export const onLoad = () => {
  registerSettings("mark-all-read-settings", SettingsPage);

  // Register command
  patches.push(
    registerCommand({
      name: "markallread",
      displayName: "Mark All Read",
      description: "Marks all messages as read.",
      execute: () => {
        markAllAsRead();
        return { content: "All messages marked as read!" };
      },
    })
  );
};

export const onUnload = () => {
  patches.forEach((unpatch) => unpatch());
  patches = [];
};
