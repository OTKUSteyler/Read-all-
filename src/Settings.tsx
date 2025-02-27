import { React } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

const { FormSwitch } = Forms;

export default () => (
  <FormSwitch
    label="Mark DMs as Read"
    value={storage.markDMs}
    onValueChange={(value) => {
      storage.markDMs = value;
    }}
  />
);
