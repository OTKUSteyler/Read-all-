import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

const { FormSwitch } = Forms;

export default () => {
    return (
        <FormSwitch
            label="Enable Read All Button"
            value={storage.enableReadAll ?? true}
            onValueChange={(value) => {
                storage.enableReadAll = value;
            }}
        />
    );
};
