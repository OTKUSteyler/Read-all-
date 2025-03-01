import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";
import { after } from "@vendetta/patcher";

// 🔍 Find correct Discord functions
const ChannelActions = findByProps("ack", "ackMessage", "bulkAck");

if (!ChannelActions) {
    console.error("❌ Failed to find Discord message functions:", findByProps("ack", "ackMessage", "bulkAck"));
    showToast("Failed to find Discord functions. Check logs.", { type: "danger" });
}

// 📌 Function to mark all messages as read
function readAllMessages() {
    if (!ChannelActions || !ChannelActions.bulkAck) {
        showToast("Error: Unable to mark messages as read.", { type: "danger" });
        return;
    }

    try {
        // 🔄 Fetch all channels
        const channels = findByProps("getChannel").getChannel;
        Object.keys(channels).forEach(channelId => {
            ChannelActions.bulkAck(channelId);
        });

        showToast("✅ All messages marked as read!", { type: "success" });
    } catch (error) {
        console.error("❌ Error marking messages as read:", error);
        showToast("Failed to mark messages as read.", { type: "danger" });
    }
}

// 📌 Add "Read All" Button to UI
export default {
    onLoad: () => {
        after("default", findByProps("getGuilds"), (_, res) => {
            if (!res) return;
            res.push({
                name: "Read All Messages",
                onPress: readAllMessages,
            });
        });
    },
    onUnload: () => {
        showToast("Plugin disabled.", { type: "info" });
    }
};
