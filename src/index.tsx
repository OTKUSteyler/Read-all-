import { React, useState } from 'react';
import { Button, TextInput, View } from '@vendetta/ui/components';
import { flux, storage } from '@vendetta/api';
import { showToast } from '@vendetta/ui/toasts';

// Ensure storage key exists
if (!storage.get("excludedUsers")) storage.set("excludedUsers", []);

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);
  const excludedUsers = storage.get("excludedUsers", []);

  const handleMarkAllRead = () => {
    console.log("Mark All as Read Button Clicked");

    // Get unread messages
    const unreadMessages = flux.store.getState().messages?.unread || [];

    if (unreadMessages.length === 0) {
      showToast("No unread messages found.", ToastType.INFO);
      return;
    }

    // Filter out excluded users
    const filteredMessages = unreadMessages.filter(msg => !excludedUsers.includes(msg.author?.id));

    if (filteredMessages.length === 0) {
      showToast("All unread messages are from excluded users.", ToastType.INFO);
      return;
    }

    // Mark only non-excluded messages as read
    if (flux.actions.markRead) {
      flux.actions.markRead(filteredMessages.map(msg => msg.id));
      setAllRead(true);
      showToast("Marked messages as read!", ToastType.SUCCESS);
    } else {
      showToast("Error: markRead action not found.", ToastType.FAILURE);
    }
  };

  return (
    <Button onClick={handleMarkAllRead} size={Button.Sizes.SMALL} disabled={allRead}>
      {allRead ? "All Read" : "Mark All as Read"}
    </Button>
  );
};

// ================ SETTINGS COMPONENT =====================
const Settings = () => {
  const [excluded, setExcluded] = useState(storage.get("excludedUsers", []).join(", "));

  const handleExcludedChange = (value) => {
    const users = value.split(",").map(user => user.trim());
    setExcluded(value);
    storage.set("excludedUsers", users);
  };

  return (
    <View>
      <TextInput
        value={excluded}
        onChange={handleExcludedChange}
        placeholder="Enter user IDs to exclude, separated by commas"
      />
    </View>
  );
};

// ================ EXPORT PLUGIN & SETTINGS =====================
export default {
  onLoad: () => console.log("✅ Plugin Loaded!"),
  onUnload: () => console.log("🛑 Plugin Unloaded!"),
  settings: Settings, // Makes settings clickable
  render: MarkAllReadButton, // Adds button to UI
};
