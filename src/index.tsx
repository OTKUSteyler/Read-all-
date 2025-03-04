import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Main plugin logic
const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isMessageListAvailable, setIsMessageListAvailable] = useState(false);

  // Function to read all messages when the button is clicked
  const handleReadAllMessages = () => {
    console.log("Button clicked: Attempting to mark all messages as read");

    if (!hasUnreadMessages) {
      console.log("No unread messages available.");
      return;
    }

    // Simulate marking messages as read (replace this with actual logic)
    messages.forEach((message: any) => {
      console.log(`Marking message ${message.id} as read`);
    });

    setHasUnreadMessages(false); // Reset state after marking as read
    setMessages([]); // Clear messages
    console.log("All messages marked as read.");
  };

  // Check if message list or server list UI is available
  const checkUIAvailability = () => {
    const messageList = document.querySelector('[class*="messageList-"]'); // Check for message list
    if (messageList) {
      setIsMessageListAvailable(true);
    } else {
      setIsMessageListAvailable(false);
    }
  };

  // Simulate loading unread messages and checking the UI
  useEffect(() => {
    checkUIAvailability(); // Check if message list is available

    const fetchUnreadMessages = () => {
      // Replace this with actual API to fetch unread messages
      const unreadMessages = []; // Example: This should be replaced with real unread message fetching

      if (unreadMessages.length > 0) {
        setHasUnreadMessages(true);
        setMessages(unreadMessages);
        console.log(`Found ${unreadMessages.length} unread messages.`);
      } else {
        console.log("No unread messages found.");
      }
    };

    fetchUnreadMessages(); // Fetch unread messages
    setIsMounted(true); // Mark as mounted
  }, []); // Empty dependency array ensures this runs once on mount

  if (!isMounted) return <div>Plugin not loaded properly</div>;

  if (!isMessageListAvailable) {
    return <div>Message list UI is missing. Please select a channel or server.</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", position: "relative" }}>
      <Button
        onClick={handleReadAllMessages}
        style={{ position: "absolute", top: "10px", right: "10px", zIndex: 999 }}
      >
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
