import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

const { FormSwitch } = Forms;

export default function Settings() {
    return (
        <FormSwitch
            label="Enable Read All Button"
            value={storage.enabled ?? true}
            onValueChange={(value) => {
                storage.enabled = value;
            }}
        />
    );
}
