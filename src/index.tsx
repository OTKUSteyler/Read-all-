import { React, ReactNative } from '@vendetta/metro/common';
import { findByProps } from '@vendetta/metro';
import { registerSettings } from '@vendetta/settings';
import { storage } from '@vendetta/plugin';
import SettingsPage from './Settings';
import { styles } from './styles';

const { View, TouchableOpacity, Text } = ReactNative;
const { ackMessage } = findByProps('ackMessage');

storage.markDMs = storage.markDMs ?? true;

const markAllAsRead = async () => {
    const channels = Object.values(findByProps('getChannel').getMutableChannels());

    for (const channel of channels) {
        if (!storage.markDMs && channel.type === 1) continue;

        try {
            await ackMessage(channel.id);
        } catch (error) {
            console.error(`[ReadAll] Failed to mark ${channel.id} as read:`, error);
        }
    }
};

const ReadAllButton = () => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={markAllAsRead}>
            <Text style={styles.buttonText}>Mark All Read</Text>
        </TouchableOpacity>
    </View>
);

export const onLoad = () => {
    registerSettings('read-all-settings', SettingsPage);
};

export const onUnload = () => {};
