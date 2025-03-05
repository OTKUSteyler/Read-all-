import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { showToast } from "@vendetta/ui/toasts";

// Find Discord's ReadState functions
const ReadState = findByProps("ack", "getUnreadCount");

// Find the sidebar dynamically
const GuildsNav = findByName("GuildsNav", false);

// Function to mark all messages as read
function markAllRead() {
  try {
    Object.values(ReadState.getGuilds()).forEach((guild: any) => {
      ReadState.ack(guild.id);
    });
    showToast("All messages marked as read!", { type: "success" });
  } catch (error) {
    console.error("[ReadAll] Error marking messages as read:", error);
    showToast("Failed to mark messages as read.", { type: "error" });
  }
}

// "Read All" Button Component
const ReadAllButton = () => {
  return (
    <ReactNative.TouchableOpacity
      onPress={markAllRead}
      style={{
        backgroundColor: "#5865F2",
        padding: 10,
        borderRadius: 8,
        margin: 8,
        alignItems: "center",
      }}
    >
      <ReactNative.Text style={{ color: "white", fontWeight: "bold" }}>
        Read All
      </ReactNative.Text>
    </ReactNative.TouchableOpacity>
  );
};

// Patch the Guilds sidebar to add the button
if (GuildsNav) {
  after("default", GuildsNav, (_, component) => {
    if (!component || !component.props) return component;

    component.props.children.push(<ReadAllButton />);
    return component;
  });
} else {
  console.error("[ReadAll] Sidebar component not found!");
}
