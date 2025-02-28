import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";

export default function Settings() {
    useProxy(storage);

    return (
        <Forms.FormSection title="Read All Settings">
            <Forms.FormSwitch
                label="Enable for DMs"
                value={storage.markDMs ?? true}
                onValueChange={(value) => (storage.markDMs = value)}
            />
        </Forms.FormSection>
    );
}
