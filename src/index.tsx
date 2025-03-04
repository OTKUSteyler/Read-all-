import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Ensure the correct message UI context exists
const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const [isMessageListAvailable, setIsMessageListAvailable] = useState(false);

  // Simulate the function to read all messages when the button is clicked
  const handleReadAllMessages = () => {
    if (!hasUnreadMessages) {
      console.log("No unread messages available.");
      return;
    }

    console.log("Button clicked: Marking all messages as read");

    // Mark messages as read (replace with actual logic)
    messages.forEach((message: any) => {
      console.log(`Marking message ${message.id} as read`);
    });

    setHasUnreadMessages(false);
    setMessages([]);
  };

  useEffect(() => {
    // Check if the message list is available (if you are in a server or channel)
    const checkMessageListAvailability = () => {
      // Make sure we're on a page with a message list (i.e., a channel is selected)
      const messageList = document.querySelector('[class*="messageList-"]');
      if (messageList) {
        setIsMessageListAvailable(true);
      } else {
        setIsMessageListAvailable(false);
      }
    };

    // Run the check every time the component mounts or updates
    checkMessageListAvailability();

    // Simulate loading unread messages from Vendetta API (replace this with real API calls)
    const unreadMessages = []; // Replace with real unread messages API call
    if (unreadMessages.length > 0) {
      setHasUnreadMessages(true);
      setMessages(unreadMessages);
      console.log(`Found ${unreadMessages.length} unread messages.`);
    }

    setIsMounted(true);

  }, []);

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

    const ReactDOM = getModule(["render"]);
    ReactDOM.render(<Plugin />, document.getElementById("app-mount"));
  },
  stop() {
    console.log("Plugin stopped");

    const ReactDOM = getModule(["render"]);
    ReactDOM.unmountComponentAtNode(document.getElementById("app-mount"));
  },
};
