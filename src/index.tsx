import { getModule, React, ReactDOM } from "@vendetta/metro";
import { Button } from "@vendetta/ui/components";
import { useState, useEffect } from "react";

// Sample function for testing
const Plugin = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Simulating the function to read messages when the button is clicked
  const handleReadAllMessages = () => {
    console.log("Button clicked: Marking all messages as read");

    // Simulate reading all messages by just logging
    // You can replace this with actual message-marking logic
    setIsMounted(false);
  };

  // Simulate component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>Plugin not loaded properly</div>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", position: "relative" }}>
      <Button onClick={handleReadAllMessages} style={{ position: "absolute", top: "10px", right: "10px" }}>
        Read All Messages
      </Button>
      <h2>Click the button to read all messages</h2>
    </div>
  );
};

export default {
  start() {
    // Inject the Plugin component into the Discord UI
    const ReactDOM = getModule(["render"]);
    ReactDOM.render(<Plugin />, document.getElementById("app-mount")); // Adjust mount point if needed
    console.log("Plugin started!");
  },
  stop() {
    // Cleanup code if necessary
    const ReactDOM = getModule(["render"]);
    ReactDOM.unmountComponentAtNode(document.getElementById("app-mount")); // Adjust mount point if needed
    console.log("Plugin stopped!");
  },
};
