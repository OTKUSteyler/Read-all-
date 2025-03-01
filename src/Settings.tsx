import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";

const Settings = () => {
    const [enabled, setEnabled] = React.useState(storage.enableReadAll ?? true);

    const toggleEnable = () => {
        storage.enableReadAll = !enabled;
        setEnabled(!enabled);
    };

    return (
        <ReactNative.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ReactNative.Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                Enable Read All Messages
            </ReactNative.Text>
            <ReactNative.Switch value={enabled} onValueChange={toggleEnable} />
        </ReactNative.View>
    );
};

export default Settings;
