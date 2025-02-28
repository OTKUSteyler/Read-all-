import { React, useState, useEffect } from 'react';
import { Button } from '@vendetta/ui/components';
import { flux } from '@vendetta/api';
import { showToast } from '@vendetta/ui/toasts'; // Import showToast

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);

  const handleMarkAllRead = () => {
    console.log("Mark All as Read Button Clicked");
    flux.actions.markAllNotificationsAsRead(); // Mark all notifications as read
    setAllRead(true);

    // Show toast notification
    showToast("All notifications marked as read!", ToastType.SUCCESS);
  };

  useEffect(() => {
    console.log("useEffect Hook Ran");
    const interval = setInterval(() => {
      const unreadMessages = flux.store.getState().notifications.unread;
      console.log("Checking unread messages:", unreadMessages);
      if (unreadMessages > 0) {
        setAllRead(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("useEffect Cleanup");
    };
  }, []);

  return (
    <Button onClick={handleMarkAllRead} size={Button.Sizes.SMALL} disabled={allRead}>
      {allRead ? "All Read" : "Mark All as Read"}
    </Button>
  );
};

export default MarkAllReadButton;
