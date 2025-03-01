import { storage } from "@vendetta/plugin";
import { General } from "@vendetta/ui/components";

export default function Settings() {
    return (
        <General.FormSwitch
            label="Enable Read All Button"
            value={storage.enabled ?? true}
            onValueChange={(value) => {
                storage.enabled = value;
            }}
        />
    );
}
