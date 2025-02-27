import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { ReactNative } from "@vendetta/metro/common";
import { General } from "@vendetta/ui/components";

const { View } = ReactNative;
const { FormSwitchRow } = General;

export default function Settings() {
    useProxy(storage);

    return (
        <View>
            <FormSwitchRow
                label="Mark DMs as Read"
                subLabel="If enabled, direct messages will also be marked as read."
                value={storage.markDMs ?? true}
                onValueChange={(value) => (storage.markDMs = value)}
            />
        </View>
    );
}
