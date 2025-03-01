import { storage } from "@vendetta/plugin";
import { React, useState } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";

export default () => {
    const [enabled, setEnabled] = useState(storage.enableReadAll);

    return (
        <Forms.FormSection title="Read All Messages Plugin">
            <Forms.FormSwitchRow
                label="Enable 'Read All Messages' Overlay Button"
                value={enabled}
                onValueChange={(val) => {
                    storage.enableReadAll = val;
                    setEnabled(val); // Immediately update the UI
                }}
            />
        </Forms.FormSection>
    );
};
