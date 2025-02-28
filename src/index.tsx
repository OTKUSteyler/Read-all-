import { React, useState, useEffect } from "react";
import { Button } from "@vendetta/ui/components";
import { flux, storage } from "@vendetta/api";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import Settings from "./Settings"; // Import settings page
import styles from "./style"; // Import styles

// Initialize excluded users if not set already
useEffect(() => {
  if (!storage.get("excludedUsers")) {
    storage.set("excludedUsers", []);
  }
}, []);

// Main Mark All Read Button
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

    console.log("Filtered Messages: ", filteredMessages); // Debug log

    // Mark non-excluded messages as read
    if (flux.actions.markRead) {
      console.log("MarkRead function exists.");
      flux.actions.markRead(filteredMessages.map((msg) => msg.id));
      setAllRead(true); // Change state to show all read
      showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
    } else {
      console.log("❌ Error: markRead action not found.");
      showToast("❌ Error: markRead action not found.", ToastType.FAILURE);
    }
  };

  return (
    <Button
      style={styles.button} // Apply button style from styles.ts
      onClick={handleMarkAllRead}
      size={Button.Sizes.SMALL}
      disabled={allRead}
    >
      {allRead ? "✅ All Read" : "📩 Mark All as Read"}
    </Button>
  );
};

export default {
  onLoad: () => console.log("✅ Read All Messages Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // Expose settings
  render: MarkAllReadButton, // Render button in the UI
};
