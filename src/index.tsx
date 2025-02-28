import { React, useState } from 'react';
import { Button, TextInput, View } from '@vendetta/ui/components';
import { flux, storage } from '@vendetta/api';
import { showToast } from '@vendetta/ui/toasts';

// Load stored excluded users (or empty list if not set)
const excludedUsers = storage.get("excludedUsers", []);

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);

  const handleMarkAllRead = () => {
    console.log("Mark All as Read Button Clicked");

    // Get unread messages
    const unreadMessages = flux.store.getState().messages.unread;

    if (!unreadMessages) {
      showToast("No unread messages found.", ToastType.INFO);
      return;
    }

    // Filter out excluded users
    const filteredMessages = unreadMessages.filter(msg => !excludedUsers.includes(msg.author.id));

    if (filteredMessages.length === 0) {
      showToast("All unread messages are from excluded users.", ToastType.INFO);
      return;
    }

    // Mark only non-excluded messages as read
    flux.actions.markRead(filteredMessages.map(msg => msg.id));
    setAllRead(true);
    showToast("Marked messages as read!", ToastType.SUCCESS);
  };

  return (
    <Button onClick={handleMarkAllRead} size={Button.Sizes.SMALL} disabled={allRead}>
      {allRead ? "All Read" : "Mark All as Read"}
    </Button>
  );
};

// ================ SETTINGS COMPONENT =====================
const Settings = () => {
  const [excluded, setExcluded] = useState(excludedUsers.join(", "));

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
  onLoad: () => console.log("Plugin Loaded!"),
  onUnload: () => console.log("Plugin Unloaded!"),
  settings: Settings, // 🔥 FIXES THE SETTINGS BUTTON 🔥
  render: MarkAllReadButton, // Adds the button to the UI
};
