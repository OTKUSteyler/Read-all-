import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Sample function for testing
const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // Function to simulate marking messages as read
  const handleReadAllMessages = () => {
    console.log("Button clicked: Attempting to mark all messages as read");

    if (!hasUnreadMessages) {
      console.log("No unread messages available.");
      return;
    }

    // If unread messages exist, mark them as read
    messages.forEach((message: any) => {
      // Mark the message as read (replace this with actual Vendetta API logic)
      console.log(`Marking message ${message.id} as read`);
    });

    setHasUnreadMessages(false); // Set state to reflect that messages are read
    setMessages([]); // Clear the list of unread messages
    console.log("All messages marked as read.");
  };

  // Simulate loading unread messages
  useEffect(() => {
    console.log("Plugin mounted: Loading messages");

    // Simulate fetching unread messages (replace with actual Vendetta API logic)
    const fetchedMessages = []; // Should be replaced with Vendetta's API to get unread messages

    if (fetchedMessages.length > 0) {
      setHasUnreadMessages(true);
      setMessages(fetchedMessages);
      console.log(`Found ${fetchedMessages.length} unread messages.`);
    } else {
      console.log("No unread messages found.");
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>Plugin not loaded properly</div>;

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

    // Cleanup code if necessary
    const ReactDOM = getModule(["render"]);
    ReactDOM.unmountComponentAtNode(document.getElementById("app-mount")); // Adjust mount point if needed
  },
};
