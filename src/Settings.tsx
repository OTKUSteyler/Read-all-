import { useState } from "react";
import { View, Text } from "@vendetta/metro/common";
import { Switch } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    // Ensure settings are initialized
    if (storage.enableReadAll === undefined) {
        storage.enableReadAll = true;
    }

    const [isEnabled, setIsEnabled] = useState(storage.enableReadAll);

    const toggleReadAll = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        storage.enableReadAll = newValue;
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                Enable "Read All" Button
            </Text>
            <Switch value={isEnabled} onValueChange={toggleReadAll} />
        </View>
    );
};

export default Settings;
