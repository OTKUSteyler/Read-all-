import { storage } from '@vendetta/plugin';
import { Forms } from '@vendetta/ui/components';

const { FormSwitch } = Forms;

const SettingsPage = () => (
    <FormSwitch
        label="Mark DMs as Read"
        value={storage.markDMs}
        onValueChange={(value) => (storage.markDMs = value)}
    />
);

export default SettingsPage;
