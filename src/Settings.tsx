import { React } from "@vendetta";
import { Forms } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

export default function Settings() {
  return (
    <Forms.FormSection title="Read All Messages Settings">
      <Forms.FormInput
        title="Excluded Users (Comma Separated)"
        value={storage.get("excludedUsers", []).join(", ")}
        onChange={(value) => storage.set("excludedUsers", value.split(",").map(id => id.trim()))}
        placeholder="Enter user IDs to exclude"
      />
    </Forms.FormSection>
  );
}
