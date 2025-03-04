import { findByStoreName, findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { React } from "@vendetta/metro/common";
import { Button } from "@vendetta/ui/components";

// Find Guild & Channel Stores
const GuildStore = findByStoreName("GuildStore");
const ChannelStore = findByStoreName("ChannelStore");

// Find Message Acknowledgment Functions
const MessageAck = findByProps("ack", "ackMessage", "markRead");

// Function to Mark All Messages as Read
const markAllRead = () => {
    if (!MessageAck || !MessageAck.ackMessage) {
        console.error("[Read All] No valid message acknowledgment function found!");
        return;
    }

    const guilds = GuildStore.getGuilds();
    Object.values(guilds).forEach(guild => {
        const channels = ChannelStore.getChannels(guild.id);
        Object.values(channels).forEach(channel => {
            MessageAck.ackMessage(channel.id);
        });
    });
};

// Inject "Read All" Button
const injectReadAllButton = () => {
    const ChannelHeader = findByProps("ChannelHeader");
    if (!ChannelHeader) {
        console.error("[Read All] Server list UI missing.");
        return;
    }

    after("default", ChannelHeader, (_, res) => {
        res.props.children.push(
            <Button text="Read All" onPress={markAllRead} />
        );
        return res;
    });
};

// Run the Injection
injectReadAllButton();
