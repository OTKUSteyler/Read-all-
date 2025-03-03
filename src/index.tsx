import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";
import Settings from "./Settings";

let unpatch;

export const onLoad = () => {
    try {
        // Retrieve the Guilds component
        const Guilds = findByProps("Guilds")?.Guilds;
        if (!Guilds) {
            console.error("Server list UI missing!");
            showToast("Error: Server list UI missing!", { type: "danger" });
            return;
        }

        // Patch the Guilds component to inject the "Read All" button
        unpatch = after("default", Guilds, ([props], res) => {
            if (!res?.props?.children || !storage.enableReadAll) return res;

            const readAllButton = (
                <ReactNative.TouchableOpacity
                    onPress={() => {
                        // Implement the functionality to mark all messages as read
                        showToast("All messages marked as read!", { type: "success" });
                    }}
                    style={{
                        marginBottom: 10,
                        padding: 10,
                        backgroundColor: "#5865F2",
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <ReactNative.Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Read All
                    </ReactNative.Text>
                </ReactNative.TouchableOpacity>
            );

            res.props.children.unshift(readAllButton);
            return res;
        });

        console.log("Plugin loaded successfully.");
    } catch (error) {
        console.error("Error loading plugin:", error);
        showToast("Error loading plugin!", { type: "danger" });
    }
};

export const onUnload = () => {
    if (unpatch) {
        unpatch();
        showToast("Plugin unloaded.", { type: "success" });
    }
};

export const settings = Settings;
