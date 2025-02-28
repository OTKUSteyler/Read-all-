import { React, useState } from "react";
import { Button } from "@vendetta/ui/components";
import { flux, storage } from "@vendetta/api";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings"; // Ensure this points to the correct path of settings.tsx
import styles from "./style"; // Ensure this points to the correct path of style.ts

// Load stored excluded users (or default to an empty list)
if (!storage.get("excludedUsers")) storage.set("excludedUsers", []);

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
      style={styles.button} // Apply styles here
      onClick={handleMarkAllRead}
      size={Button.Sizes.SMALL}
      disabled={allRead}
    >
      {allRead ? "✅ All Read" : "📩 Mark All as Read"}
    </Button>
  );
};

// ================= EXPORT PLUGIN & SETTINGS ===================
export default {
  onLoad: () => console.log("✅ Read All Messages Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // This exposes the settings page
  render: MarkAllReadButton, // This adds the button to the UI
};
