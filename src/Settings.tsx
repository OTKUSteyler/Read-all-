import { React } from "@vendetta";
import { Forms } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

export default function Settings() {
  // Get current excluded users
  const excludedUsers = storage.get("excludedUsers", []);

  const handleChange = (value: string) => {
    console.log("Saving excluded users:", value);
    storage.set("excludedUsers", value.split(",").map(id => id.trim()));
  };

  return (
    <Forms.FormSection title="Read All Messages Settings">
      <Forms.FormInput
        title="Excluded Users (Comma Separated)"
        value={excludedUsers.join(", ")}  // Display current excluded users
        onChange={handleChange}
        placeholder="Enter user IDs to exclude"
      />
    </Forms.FormSection>
  );
}
