import { React, useState } from "react";
import { Button } from "@vendetta/ui/components";
import { flux, storage } from "@vendetta/api";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import Settings from "./Settings"; // Import your Settings page
import styles from "./style"; // Import your styles

// Initialize excluded users in storage if not already present
if (!storage.get("excludedUsers")) {
  storage.set("excludedUsers", []);
}

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);
  const excludedUsers = storage.get("excludedUsers", []);

  const handleMarkAllRead = () => {
    console.log("📩 Mark All as Read Button Clicked");

    // Get unread messages from Flux store
    const unreadMessages = flux.store.getState().messages?.unread || [];

    if (unreadMessages.length === 0) {
      showToast("No unread messages found.", ToastType.INFO);
      return;
    }

    // Filter messages from excluded users
    const filteredMessages = unreadMessages.filter(
      (msg) => !excludedUsers.includes(msg.author?.id)
    );

    if (filteredMessages.length === 0) {
      showToast("All unread messages are from excluded users.", ToastType.INFO);
      return;
    }

    // Mark non-excluded messages as read
    if (flux.actions.markRead) {
      flux.actions.markRead(filteredMessages.map((msg) => msg.id));
      setAllRead(true);
      showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
    } else {
      showToast("❌ Error: markRead action not found.", ToastType.FAILURE);
    }
  };

  return (
    <Button
      style={styles.button} // Apply your styles here
      onClick={handleMarkAllRead}
      size={Button.Sizes.SMALL}
      disabled={allRead}
    >
      {allRead ? "✅ All Read" : "📩 Mark All as Read"}
    </Button>
  );
};

// Export the plugin settings and button
export default {
  onLoad: () => console.log("✅ Read All Messages Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // Expose the settings page
  render: MarkAllReadButton, // This adds the button to the UI
};
