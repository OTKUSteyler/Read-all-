import { useState } from "react";
import { View, Text } from "@vendetta/metro/common";
import { Switch } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    // Ensure setting exists in storage
    if (storage.enableReadAll === undefined) storage.enableReadAll = true;

    const [isEnabled, setIsEnabled] = useState(storage.enableReadAll);

    // Toggle the "Read All" button visibility
    const toggleReadAll = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        storage.enableReadAll = newState;
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                📩 Enable "Read All" Button
            </Text>
            <Switch
                value={isEnabled}
                onValueChange={toggleReadAll}
            />
        </View>
    );
};

export default Settings;
