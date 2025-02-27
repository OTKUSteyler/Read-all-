import { React } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";

const { View, TouchableOpacity, Text, Alert } = require("react-native");

// Find Discord API methods
const markRead = findByProps("ack", "markChannelRead")?.markChannelRead;
const getGuilds = findByProps("getGuilds")?.getGuilds;
const getSortedPrivateChannels = findByProps("getSortedPrivateChannels")?.getSortedPrivateChannels;

let unpatch: (() => void) | null = null;

// Function to mark all as read
const markAllAsRead = () => {
  if (!markRead || !getGuilds) {
    Alert.alert("Error", "Unable to mark messages as read. Discord API changed.");
    return;
  }

  // Mark all servers as read
  const guilds = Object.keys(getGuilds());
  guilds.forEach((guildId) => markRead(guildId));

  // Mark DMs as read
  if (getSortedPrivateChannels) {
    const dms = getSortedPrivateChannels();
    dms.forEach((dm) => markRead(dm.channel.id));
  }

  Alert.alert("Success", "All messages marked as read!");
};

// Inject button into sidebar
const injectSidebarButton = () => {
  const TabBar = findByProps("tabBarItem", "tabBarContainer");
  if (!TabBar) return null;

  const SidebarButton = () => (
    <TouchableOpacity
      style={{
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#7289DA",
        alignItems: "center",
      }}
      onPress={markAllAsRead}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Mark All Read</Text>
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

// Load the plugin
export const onLoad = () => {
  unpatch = injectSidebarButton();
};

// Unload the plugin
export const onUnload = () => {
  if (unpatch) unpatch();
};
