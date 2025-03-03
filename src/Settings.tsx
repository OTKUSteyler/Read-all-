import { useState } from "react";
import { View, Text } from "@vendetta/metro/common";
import { Switch } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    // Initialize state with the current setting or default to true
    const [isEnabled, setIsEnabled] = useState(storage.enableReadAll ?? true);

    // Function to toggle the "Read All" feature on/off
    const toggleReadAll = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        storage.enableReadAll = newValue;
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                Enable "Read All" Feature
            </Text>
            <Switch value={isEnabled} onValueChange={toggleReadAll} />
        </View>
    );
};

export default Settings;
