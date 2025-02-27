import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

const { FormSwitch } = Forms;

const SettingsPage = () => {
    return (
        <FormSwitch
            label="Mark DMs as Read"
            value={storage.readDMs}
            onValueChange={(value) => {
                storage.readDMs = value;
            }}
        />
    );
};

export default SettingsPage;
