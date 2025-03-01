import { storage } from "@vendetta/plugin";
import { React } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";

export default () => (
    <Forms.FormSection title="Read All Messages Plugin">
        <Forms.FormSwitchRow
            label="Enable 'Read All Messages' Overlay Button"
            value={storage.enableReadAll}
            onValueChange={(val) => {
                storage.enableReadAll = val;
            }}
        />
    </Forms.FormSection>
);
