import { React, useEffect } from '@vendetta/metro/common';
import { Button } from '@vendetta/ui/components';
import { flux } from '@vendetta/api/flux';

export default function InjectMarkAllReadButton() {
  useEffect(() => {
    // Use Vendetta API to add the button to the Discord UI
    const interval = setInterval(() => {
      const notificationPanel = document.querySelector('.notifications-class'); // Find where notifications are listed
      
      if (notificationPanel) {
        // Assuming you add the button inside the notification panel
        const button = document.createElement('div');
        button.innerHTML = `
          <button onclick="markAllRead()" style="padding: 10px; background-color: #4CAF50; color: white; border: none;">Mark All as Read</button>
        `;
        
        notificationPanel.appendChild(button);
        clearInterval(interval); // Stop checking after the button is added
      }
    }, 1000); // Try every second until the panel is found
  }, []);

  // Mark All as Read logic
  const markAllRead = () => {
    flux.actions.markAllNotificationsAsRead();
  };

  return null; // This is an injected button, no need for a render function here
}
