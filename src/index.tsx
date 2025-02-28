import { React, flux, storage } from "@vendetta";
import { Button } from "@vendetta/ui/components";
import { showToast, ToastType } from "@vendetta/ui/toasts";
import Settings from "./Settings"; // Import settings page
import styles from "./style"; // Import styles

// Ensure excludedUsers storage exists
if (!storage.get("excludedUsers")) {
  storage.set("excludedUsers", []);
}

// Main Read All Messages button component
const MarkAllReadButton = () => {
  const excludedUsers = storage.get("excludedUsers", []);
  
  const handleMarkAllRead = () => {
    console.log("📩 Mark All as Read button clicked.");

    // Get unread messages from Flux store
    const unreadMessages = flux.store.getState().messages?.unread || [];
    
    if (unreadMessages.length === 0) {
      showToast("No unread messages found.", ToastType.INFO);
      return;
    }

    // Filter out messages from excluded users
    const filteredMessages = unreadMessages.filter(
      (msg) => !excludedUsers.includes(msg.author?.id)
    );

    if (filteredMessages.length === 0) {
      showToast("All unread messages are from excluded users.", ToastType.INFO);
      return;
    }

    console.log("✅ Marking messages as read:", filteredMessages);

    // Use Flux action to mark as read
    if (flux.actions.markRead) {
      flux.actions.markRead(filteredMessages.map((msg) => msg.id));
      showToast("✅ Marked all messages as read!", ToastType.SUCCESS);
    } else {
      console.error("❌ Flux action `markRead` not found.");
      showToast("❌ Error: Cannot mark messages as read.", ToastType.FAILURE);
    }
  };

  return (
    <Button style={styles.button} onClick={handleMarkAllRead}>
      📩 Mark All as Read
    </Button>
  );
};

// Plugin setup
export default {
  onLoad: () => console.log("✅ Read All Messages Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // Plugin settings page
  render: MarkAllReadButton, // Render button in UI
};
