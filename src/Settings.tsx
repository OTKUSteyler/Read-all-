import { storage } from "@vendetta/plugin";
import { React } from "@vendetta/metro/common";
import { General } from "@vendetta/ui/components";

export default () => (
    <General.SettingsSection title="Read All Messages">
        <General.SettingsSwitch
            title="Enable 'Read All Messages' Button"
            value={storage.enableReadAll}
            onValueChange={(val) => {
                storage.enableReadAll = val;
            }}
        />
    </General.SettingsSection>
);
