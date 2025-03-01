import { React, useState } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { View, Text, Switch } from "react-native";

const Settings = () => {
    const [enabled, setEnabled] = useState<boolean>(storage.enableReadAll ?? true);

    const toggleSwitch = (val: boolean) => {
        storage.enableReadAll = val;
        setEnabled(val);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF", marginBottom: 10 }}>
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

export default Settings;
