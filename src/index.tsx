import { React } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";

const { TouchableOpacity, Text, StyleSheet } = require("react-native");

// Find Discord API methods
const markRead = findByProps("ack", "markChannelRead")?.markChannelRead;
const getGuilds = findByProps("getGuilds")?.getGuilds;
const getSortedPrivateChannels = findByProps("getSortedPrivateChannels")?.getSortedPrivateChannels;

// Function to mark all messages as read
const markAllAsRead = () => {
  if (!markRead || !getGuilds) return;

  // Mark all servers as read
  Object.keys(getGuilds()).forEach((guildId) => markRead(guildId));

  // Mark DMs as read
  if (getSortedPrivateChannels) {
    getSortedPrivateChannels().forEach((dm) => markRead(dm.channel.id));
  }
};

// Inject button into top bar
let unpatch: (() => void) | null = null;

const injectTopBarButton = () => {
  const TopBar = findByProps("TopTabBar", "tabBarContainer");
  if (!TopBar) return null;

  const Button = () => (
    <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
      <Text style={styles.text}>✔ Read All</Text>
    </TouchableOpacity>
  );

  const originalRender = TopBar.TopTabBar;
  TopBar.TopTabBar = function PatchedTopBar(props) {
    const render = originalRender.apply(this, arguments);
    return (
      <>
        {render}
        <Button />
      </>
    );
  };

  return () => {
    TopBar.TopTabBar = originalRender;
  };
};

// Plugin lifecycle
export const onLoad = () => {
  unpatch = injectTopBarButton();
};

export const onUnload = () => {
  if (unpatch) unpatch();
};

// Styles for the button
const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginHorizontal: 10,
    backgroundColor: "#7289DA",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
