import { React, ReactNative } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { showToast } from "@vendetta/ui/toasts";

// 🛠 Debugging Helper
const log = (msg: string, type: "log" | "warn" | "error" = "log") => {
  console[type](`[ReadAll] ${msg}`);
};

// 1️⃣ Find ReadState dynamically
const ReadState = findByProps("ack", "isUnread") || findByProps("markAsRead");

if (!ReadState) {
  log("❌ ReadState module NOT found! Retrying...", "error");
}

// 2️⃣ Function to mark all messages as read
function markAllRead() {
  try {
    const unreadChannels = ReadState?.getUnreadChannels ? ReadState.getUnreadChannels() : {};
    if (!unreadChannels) {
      log("⚠️ No unread messages found.", "warn");
      showToast("No unread messages.", { type: "info" });
      return;
    }

    Object.keys(unreadChannels).forEach((channelId) => {
      ReadState.ack(channelId);
    });

    showToast("All messages marked as read!", { type: "success" });
  } catch (error) {
    log(`❌ Error marking messages as read: ${error}`, "error");
    showToast("Failed to mark messages as read.", { type: "error" });
  }
}

// 3️⃣ Read All Button Component
const ReadAllButton = () => (
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

// 4️⃣ Inject Button into Sidebar
const injectButton = () => {
  let attempts = 0;

  const interval = setInterval(() => {
    const Sidebar =
      findByProps("MobileSidebar") ||
      findByProps("GuildSidebar") ||
      findByProps("SidebarContainer");

    if (Sidebar?.default) {
      log("✅ Sidebar found, injecting button!");

      after("default", Sidebar, (_, component) => {
        if (!component || !component.props) return component;
        
        // Ensure the button isn't added twice
        if (!component.props.children.find((child: any) => child?.type === ReadAllButton)) {
          component.props.children.push(<ReadAllButton />);
        }

        return component;
      });

      clearInterval(interval);
    } else {
      log(`Sidebar not found, retrying... (${attempts}/10)`);
      if (++attempts >= 10) {
        log("❌ ERROR: Sidebar not found. Aborting.", "error");
        clearInterval(interval);
      }
    }
  }, 1000);
};

injectButton(); // Start detecting sidebar on mobile
