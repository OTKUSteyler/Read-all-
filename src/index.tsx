import { React, useState, useEffect } from 'react';
import { Button } from '@vendetta/ui/components'; // Vendetta's Button component
import { flux } from '@vendetta/api'; // Vendetta's flux API
import { useChannelStore } from '@vendetta/store'; // Vendetta's store to access channel information

// Main component for the "Mark All as Read" button
const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false); // State to track button status (all read or not)

  // Function to handle the button click event (mark all notifications as read)
  const handleMarkAllRead = () => {
    flux.actions.markAllNotificationsAsRead(); // Call Flux action to mark all notifications as read
    setAllRead(true); // Change the button text to "All Read"
  };

  // Use effect hook to reset the button state if there are unread messages
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if there are unread notifications in the store (or customize this check)
      const unreadMessages = flux.store.getState().notifications.unread; // Example of how to get unread messages count
      if (unreadMessages > 0) {
        setAllRead(false); // Reset the button to "Mark All as Read" if there are unread messages
      }
    }, 1000); // Check for unread messages every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <Button
      onClick={handleMarkAllRead} // Button click handler
      size={Button.Sizes.SMALL} // Button size
      disabled={allRead} // Disable the button when all messages are read
    >
      {allRead ? "All Read" : "Mark All as Read"} {/* Toggle text based on button state */}
    </Button>
  );
};

export default MarkAllReadButton;
