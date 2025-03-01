import { React, useState } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { View, Text, Switch } from "react-native";

export default () => {
    const [enabled, setEnabled] = useState(storage.enableReadAll ?? true); // Default to true if undefined

    const toggleSwitch = (val: boolean) => {
        storage.enableReadAll = val; // Save to storage
        setEnabled(val); // Update UI instantly
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1E1E1E",
            }}
        >
            <Text style={{ fontSize: 18, color: "#FFFFFF", marginBottom: 15 }}>
                Enable 'Read All Messages' Button
            </Text>
            <Switch
                value={enabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#5865F2" }}
                thumbColor={enabled ? "#FFFFFF" : "#CCCCCC"}
            />
        </View>
    );
};
