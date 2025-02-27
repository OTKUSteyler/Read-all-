import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./Settings";

const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;

// Ensure storage has default settings
if (storage.markDMs === undefined) storage.markDMs = true;

// Find Discord API methods
const MessageStore = findByProps("ack", "markChannelRead");
const GuildStore = findByProps("getGuilds");
const ChannelStore = findByProps("getSortedPrivateChannels");

if (!MessageStore?.markChannelRead || !GuildStore?.getGuilds) {
  console.error("[ReadAll] Missing required functions!");
}

// **🔹 Function: Mark all messages as read**
const markAllAsRead = () => {
  if (!MessageStore?.markChannelRead || !GuildStore?.getGuilds) return;

  // Mark all servers as read
  Object.keys(GuildStore.getGuilds()).forEach((guildId) => {
    MessageStore.markChannelRead(guildId);
  });

  // Mark DMs as read (if enabled in settings)
  if (storage.markDMs && ChannelStore?.getSortedPrivateChannels) {
    ChannelStore.getSortedPrivateChannels().forEach((dm) => {
      MessageStore.markChannelRead(dm.channel.id);
    });
  }
};

// **🔹 Inject button into Discord UI**
let unpatch: (() => void) | null = null;

const injectTopBarButton = () => {
  const NavigationBar = findByProps("NavBar", "topBar", "title");

  if (!NavigationBar) {
    console.error("[ReadAll] Failed to find Navigation Bar!");
    return null;
  }

  const Button = () => (
    <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
      <Text style={styles.text}>✔ Read All</Text>
    </TouchableOpacity>
  );

  const OriginalNavBar = NavigationBar.NavBar;

  function PatchedNavBar(props: any) {
    const render = OriginalNavBar(props);
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {render}
        <Button />
      </View>
    );
  }

  NavigationBar.NavBar = PatchedNavBar;

  return () => {
    NavigationBar.NavBar = OriginalNavBar;
  };
};

// **🔹 Plugin Lifecycle**
export const onLoad = () => {
  registerSettings("read-all-settings", SettingsPage);
  unpatch = injectTopBarButton();
};

export const onUnload = () => {
  if (unpatch) unpatch();
};

// **🔹 Styles for Button**
const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: "#7289DA",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
