import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState } from "react";

// Import the necessary modules from Vendetta to interact with the messages
const { getMessages, markMessageAsRead } = getModule(["getMessages", "markMessageAsRead"], false);

const Plugin = () => {
  // Local state to track the messages
  const [messages, setMessages] = useState<any[]>([]);
  
  // Function to load messages and track which ones are unread
  const loadMessages = () => {
    const allMessages = getMessages();  // Adjust based on Vendetta API to get messages
    const unreadMessages = allMessages.filter((msg: any) => !msg.read);
    setMessages(unreadMessages);
  };

  // Function to mark all messages as read
  const handleReadAllMessages = () => {
    // Fetch all messages first
    loadMessages();

    // Loop through unread messages and mark them as read
    messages.forEach((message: any) => {
      // Use Vendetta's markMessageAsRead or your own logic to mark it as read
      markMessageAsRead(message.id);
    });

    // After marking as read, update the state to reflect that all messages are read
    setMessages([]);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", position: "relative" }}>
      <Button onClick={handleReadAllMessages} style={{ position: "absolute", top: "10px", right: "10px" }}>
        Read All Messages
      </Button>

      <h2>Unread Messages</h2>
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
    // Inject the Plugin component into the Discord UI
    const ReactDOM = getModule(["render"]);
    ReactDOM.render(<Plugin />, document.getElementById("app-mount"));  // Adjust mount point as necessary
  },
  stop() {
    // Cleanup code if necessary
    const ReactDOM = getModule(["render"]);
    ReactDOM.unmountComponentAtNode(document.getElementById("app-mount"));  // Adjust mount point as necessary
  },
};
