import { Text, View } from "@vendetta/metro/common";
import { Switch } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    // Set the default value for enabling/disabling the "Read All" functionality
    const enableReadAll = storage.enableReadAll ?? true;

    // Function to toggle the "Read All" feature on/off
    const toggleReadAll = () => {
        storage.enableReadAll = !enableReadAll;
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                Read All Settings
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <Text style={{ flex: 1 }}>Enable "Read All" Functionality</Text>
                <Switch value={enableReadAll} onValueChange={toggleReadAll} />
            </View>
        </View>
    );
};

export default Settings;
