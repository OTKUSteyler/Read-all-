import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./Settings";
import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";

// Discord API functions
const { markRead } = findByProps("markRead");
const { getGuilds } = findByProps("getGuilds");
const { getSortedPrivateChannels } = findByProps("getSortedPrivateChannels");

// Set default storage values
storage.includeDMs ??= true;

let patches: (() => void)[] = [];

export const onLoad = () => {
  registerSettings("mark-all-read-settings", SettingsPage);

  const MarkAllButton = () => {
    const markAllAsRead = () => {
      // Mark all server channels as read
      const guilds = Object.keys(getGuilds());
      guilds.forEach((guildId) => markRead(guildId));

      // Mark DMs if enabled in settings
      if (storage.includeDMs) {
        const dms = getSortedPrivateChannels();
        dms.forEach((dm) => markRead(dm.channel.id));
      }

      ReactNative.Alert.alert("Success", "All messages marked as read!");
    };

    return (
      <ReactNative.TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          left: 10,
          backgroundColor: "#7289DA",
          padding: 10,
          borderRadius: 5,
          zIndex: 999,
        }}
        onPress={markAllAsRead}
      >
        <ReactNative.Text style={{ color: "white", fontWeight: "bold" }}>
          Mark All Read
        </ReactNative.Text>
      </ReactNative.TouchableOpacity>
    );
  };

  // Add the button to the UI
  const DrawerNavigator = findByProps("DrawerNavigator")?.default;
  if (DrawerNavigator) {
    patches.push(
      before("default", DrawerNavigator, ([props]) => {
        if (!props?.children) return;
        props.children = (
          <>
            <MarkAllButton />
            {props.children}
          </>
        );
      })
    );
  }

  // Register the `/markallread` command
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
