import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./Settings";

const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;

// Ensure default settings exist
if (storage.markDMs === undefined) storage.markDMs = true;

// Get required Discord APIs
const MessageStore = findByProps("ack", "markChannelRead");
const GuildStore = findByProps("getGuilds");
const ChannelStore = findByProps("getSortedPrivateChannels");

if (!MessageStore || !MessageStore.markChannelRead) {
  console.error("[ReadAll] Missing `markChannelRead` method!");
}

// **🔹 Function: Mark all messages as read**
const markAllAsRead = () => {
  if (!MessageStore?.markChannelRead) return;

  // **Mark all servers as read**
  const guilds = GuildStore?.getGuilds();
  if (guilds) {
    Object.keys(guilds).forEach((guildId) => {
      MessageStore.markChannelRead(guildId);
    });
  }

  // **Mark all DMs as read (if enabled)**
  if (storage.markDMs) {
    const dms = ChannelStore?.getSortedPrivateChannels();
    if (dms) {
      dms.forEach((dm) => {
        MessageStore.markChannelRead(dm.channel.id);
      });
    }
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
