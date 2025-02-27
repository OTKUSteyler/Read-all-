import { ReactNative, React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";

const { View, TouchableOpacity, Text, StyleSheet } = ReactNative;
const { markChannelRead } = findByProps("markChannelRead", "ack");

let unpatch: (() => void) | undefined;

// Function to mark all channels as read
const markAllAsRead = async () => {
  try {
    const channels = findByProps("getMutableGuildChannels").getMutableGuildChannels();
    
    for (const guildId in channels) {
      for (const channelId in channels[guildId]) {
        await markChannelRead(channelId);
      }
    }

    alert("All channels marked as read!");
  } catch (error) {
    console.error("Failed to mark all as read:", error);
    alert("Error marking channels as read.");
  }
};

// Button Component
const ReadAllButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
        <Text style={styles.buttonText}>Mark All as Read</Text>
      </TouchableOpacity>
    </View>
  );
};

// Patch the UI to add the button
export const onLoad = () => {
  unpatch = after("default", findByProps("UnreadBadge"), (_args, res) => {
    if (!res?.props?.children || !Array.isArray(res.props.children)) return res;
    
    res.props.children.unshift(<ReadAllButton key="read-all-button" />);
    
    return res;
  });
};

export const onUnload = () => {
  if (unpatch) unpatch();
};

// Styles for the button
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#7289DA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
