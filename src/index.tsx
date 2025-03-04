import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Import the icon image (ensure you have the image in /assets)
import readAllIcon from 'https://github.com/mwittrien/BetterDiscordAddons/blob/master/Plugins%2FReadAllNotificationsButton%2F_res%2Fcover.png;' // Ensure correct path for your project

// Main plugin logic
const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isServerListAvailable, setIsServerListAvailable] = useState(false);

  // Function to read all messages when the button is clicked
  const handleReadAllMessages = () => {
    console.log("Button clicked: Attempting to mark all messages as read");

    if (!hasUnreadMessages) {
      console.log("No unread messages available.");
      return;  // Early exit if no unread messages
    }

    // Simulate marking messages as read (replace with actual logic)
    messages.forEach((message: any) => {
      console.log(`Marking message ${message.id} as read`);
    });

    setHasUnreadMessages(false); // Reset after marking as read
    setMessages([]); // Clear the messages array
    console.log("All messages marked as read.");
  };

  // Check if the server list UI is available
  const checkUIAvailability = () => {
    const serverList = document.querySelector('[class*="serverList-"]'); // Check for server list

    if (serverList) {
      setIsServerListAvailable(true);
    } else {
      setIsServerListAvailable(false);
    }
  };

  // Simulate loading unread messages and checking the UI
  useEffect(() => {
    checkUIAvailability(); // Check if server list is available

    const fetchUnreadMessages = () => {
      // Replace this with actual API to fetch unread messages
      const unreadMessages = []; // Example, replace with real unread messages fetch

      if (unreadMessages.length > 0) {
        setHasUnreadMessages(true);
        setMessages(unreadMessages);
        console.log(`Found ${unreadMessages.length} unread messages.`);
      } else {
        console.log("No unread messages found.");
        setHasUnreadMessages(false); // Make sure the flag is reset
      }
    };

    fetchUnreadMessages(); // Fetch unread messages
    setIsMounted(true); // Mark as mounted
  }, []); // Run once on mount

  if (!isMounted) return <div>Plugin not loaded properly</div>;

  if (!isServerListAvailable) {
    return <div>Server list UI is missing. Please open the server list view.</div>;
  }

  return (
    <div
      style={{
        position: "absolute",  // Position the button at the top
        top: "10px",
        left: "10px",
        zIndex: 9999,
        padding: "10px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
    >
      <Button onClick={handleReadAllMessages}>
        <img
          src={readAllIcon}
          alt="Read All"
          style={{
            width: "24px",  // Size of the image icon
            height: "24px",
            marginRight: "8px", // Space between image and button text
          }}
        />
        Read All Messages
      </Button>
      <h2>{hasUnreadMessages ? "Unread Messages Available" : "No Unread Messages"}</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {messages.map((message: any) => (
          <li key={message.id} style={{ margin: "10px 0", fontSize: "14px", color: "black" }}>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default {
  start() {
    console.log("Plugin started");

    // Inject the Plugin component into the Discord UI
    const ReactDOM = getModule(["render"]);
    ReactDOM.render(<Plugin />, document.getElementById("app-mount")); // Ensure app-mount exists
  },
  stop() {
    console.log("Plugin stopped");

    // Cleanup if necessary
    const ReactDOM = getModule(["render"]);
    ReactDOM.unmountComponentAtNode(document.getElementById("app-mount")); // Adjust mount point if needed
  },
};
