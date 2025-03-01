import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    const [enabled, setEnabled] = React.useState(storage.enableReadAll ?? true);

    return (
        <ReactNative.View style={{
            flex: 1,
            justifyContent: "center", // Centered vertically
            alignItems: "center", // Centered horizontally
            backgroundColor: "#1E1E1E",
            padding: 20,
        }}>
            <ReactNative.Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
                📩 Read All Messages Plugin
            </ReactNative.Text>

            <ReactNative.Switch
                value={enabled}
                onValueChange={(value) => {
                    setEnabled(value);
                    storage.enableReadAll = value;
                }}
            />

            <ReactNative.Text style={{ color: "#AAAAAA", marginTop: 10 }}>
                {enabled ? "✅ Enabled" : "❌ Disabled"}
            </ReactNative.Text>
        </ReactNative.View>
    );
};

export default Settings;
