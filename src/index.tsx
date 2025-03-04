import { getModule, React } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Import the icon image (make sure the path is correct)
import readAllIcon from "https://betterthanbtmc.s-ul.eu/gGEqdVTL";  // Adjust path to assets if necessary

const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // Handle click to mark all messages as read
  const handleReadAllMessages = () => {
    console.log("Button clicked: Attempting to mark all messages as read");

    if (!hasUnreadMessages) {
      console.log("No unread messages available.");
      return;
    }

    // Simulate marking messages as read
    messages.forEach((message) => {
      console.log(`Marking message ${message.id} as read`);
    });

    setHasUnreadMessages(false);
    setMessages([]);
    console.log("All messages marked as read.");
  };

  // Effect to simulate fetching unread messages
  useEffect(() => {
    const fetchUnreadMessages = () => {
      // Replace with actual API to fetch unread messages
      const unreadMessages = [];  // Replace with your logic for fetching unread messages

      if (unreadMessages.length > 0) {
        setHasUnreadMessages(true);
        setMessages(unreadMessages);
        console.log(`Found ${unreadMessages.length} unread messages.`);
      } else {
        setHasUnreadMessages(false);
        console.log("No unread messages found.");
      }
    };

    fetchUnreadMessages();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Plugin not loaded properly</div>;
  }

  return (
    <div
      style={{
        position: "absolute",
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
            width: "24px",
            height: "24px",
            marginRight: "8px",
          }}
        />
        Read All Messages
      </Button>
      <h2>{hasUnreadMessages ? "Unread Messages Available" : "No Unread Messages"}</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {messages.map((message) => (
          <li key={message.id} style={{ margin: "10px 0", fontSize: "14px" }}>
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

    // Ensure your render point is correct (adjust if needed)
    const ReactDOM = getModule(["render"]);
    const rootElement = document.getElementById("app-mount");
    if (rootElement) {
      ReactDOM.render(<Plugin />, rootElement);
    }
  },
  stop() {
    console.log("Plugin stopped");

    // Ensure React component is unmounted properly
    const ReactDOM = getModule(["render"]);
    const rootElement = document.getElementById("app-mount");
    if (rootElement) {
      ReactDOM.unmountComponentAtNode(rootElement);
    }
  },
};
