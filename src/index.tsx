import { React } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./Settings";
import { registerCommand } from "@vendetta/commands";
import { findByProps, findByName } from "@vendetta/metro";

// Import UI elements
const { View, TouchableOpacity, Text, Alert } = require("react-native");

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

// Inject button into sidebar
const injectSidebarButton = () => {
  const TabBar = findByProps("tabBarItem", "tabBarContainer");
  if (!TabBar) return;

  const SidebarButton = () => (
    <TouchableOpacity
      style={{
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#7289DA",
      }}
      onPress={markAllAsRead}
    >
      <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Mark All Read</Text>
    </TouchableOpacity>
  );

  const originalRender = TabBar.default;
  TabBar.default = function PatchedTabBar(props) {
    const render = originalRender.apply(this, arguments);
    return (
      <View>
        {render}
        <SidebarButton />
      </View>
    );
  };

  return () => {
    TabBar.default = originalRender;
  };
};

export const onLoad = () => {
  registerSettings("mark-all-read-settings", SettingsPage);

  // Register sidebar button patch
  patches.push(injectSidebarButton());

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
  patches.forEach((unpatch) => unpatch?.());
  patches = [];
};
