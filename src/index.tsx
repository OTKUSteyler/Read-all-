import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./settings.ts";

import { findByProps } from "@vendetta/metro";

// Discord API functions
const { markRead } = findByProps("markRead");
const { getGuilds } = findByProps("getGuilds");
const { getSortedPrivateChannels } = findByProps("getSortedPrivateChannels");

let patches: (() => void)[] = [];

// Set default storage values
storage.includeDMs ??= true;

export const onLoad = () => {
  // Register the settings page
  registerSettings("mark-all-read-settings", SettingsPage);

  // Patch the UI to add the "Mark All as Read" button
  patches.push(
    before("default", findByProps("DrawerNavigator"), ([props]) => {
      if (!props?.children) return;

      const MarkAllButton = () => {
        const markAllAsRead = () => {
          // Mark all server channels as read
          const guilds = Object.keys(getGuilds());
          guilds.forEach((guildId) => markRead(guildId));

          // Mark DMs as read only if enabled in settings
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

      props.children = (
        <>
          <MarkAllButton />
          {props.children}
        </>
      );
    })
  );
};

export const onUnload = () => {
  patches.forEach((unpatch) => unpatch());
  patches = [];
};
