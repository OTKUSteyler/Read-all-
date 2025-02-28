import { React, useState } from "react";
import { Button } from "@vendetta/ui/components";
import { flux, storage } from "@vendetta/api";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings"; // Import the new settings page

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);
  const excludedUsers = storage.get("excludedUsers", []);

  const handleMarkAllRead = () => {
    console.log("📩 Mark All as Read Button Clicked");

    const unreadMessages = flux.store.getState().messages?.unread || [];

    if (unreadMessages.length === 0) {
      showToast("No unread messages found.", ToastType.INFO);
      return;
    }

    const filteredMessages = unreadMessages.filter((msg) => !excludedUsers.includes(msg.author?.id));

    if (filteredMessages.length === 0) {
      showToast("All unread messages are from excluded users.", ToastType.INFO);
      return;
    }

    if (flux.actions.markRead) {
      flux.actions.markRead(filteredMessages.map((msg) => msg.id));
      setAllRead(true);
      showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
    } else {
      showToast("❌ Error: markRead action not found.", ToastType.FAILURE);
    }
  };

  return (
    <Button onClick={handleMarkAllRead} size={Button.Sizes.SMALL} disabled={allRead}>
      {allRead ? "✅ All Read" : "📩 Mark All as Read"}
    </Button>
  );
};

// ================= EXPORT PLUGIN & SETTINGS ===================
export default {
  onLoad: () => console.log("✅ Read All Messages Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // Now correctly references the settings page
  render: MarkAllReadButton, // Adds button to UI
};
