import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
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
const UnreadStore = findByProps("hasUnread");

// **🔹 Function: Mark all messages as read**
const markAllAsRead = () => {
  if (!MessageStore?.markChannelRead) return;

  let count = 0;

  // **Mark all servers as read**
  const guilds = GuildStore?.getGuilds();
  if (guilds) {
    Object.keys(guilds).forEach((guildId) => {
      if (UnreadStore?.hasUnread(guildId)) {
        MessageStore.markChannelRead(guildId);
        count++;
      }
    });
  }

  // **Mark all DMs as read (if enabled)**
  if (storage.markDMs) {
    const dms = ChannelStore?.getSortedPrivateChannels();
    if (dms) {
      dms.forEach((dm) => {
        if (UnreadStore?.hasUnread(dm.channel.id)) {
          MessageStore.markChannelRead(dm.channel.id);
          count++;
        }
      });
    }
  }

  console.log(`[ReadAll] Marked ${count} channels as read.`);
};

// **🔹 Inject Button into UI**
let unpatch: (() => void) | null = null;

const injectSidebarButton = () => {
  const Sidebar = findByName("Guilds", false);

  if (!Sidebar) {
    console.error("[ReadAll] Failed to find Sidebar!");
    return null;
  }

  const Button = () => (
    <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
      <Text style={styles.text}>✔ Read All</Text>
    </TouchableOpacity>
  );

  const OriginalSidebar = Sidebar.default;

  function PatchedSidebar(props: any) {
    return (
      <View style={{ flexDirection: "column" }}>
        <Button />
        <OriginalSidebar {...props} />
      </View>
    );
  }

  Sidebar.default = PatchedSidebar;

  return () => {
    Sidebar.default = OriginalSidebar;
  };
};

// **🔹 Plugin Lifecycle**
export const onLoad = () => {
  registerSettings("read-all-settings", SettingsPage);
  unpatch = injectSidebarButton();
};

export const onUnload = () => {
  if (unpatch) unpatch();
};

// **🔹 Styles**
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    marginHorizontal: 8,
    backgroundColor: "#5865F2",
    borderRadius: 6,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
