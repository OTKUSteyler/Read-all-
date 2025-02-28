import { React } from "@vendetta";
import { Forms } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

// Settings page
export default function Settings() {
  // Get the currently excluded users (if any)
  const excludedUsers = storage.get("excludedUsers", []);

  const handleChange = (value: string) => {
    // Save comma-separated values as an array in storage
    storage.set("excludedUsers", value.split(",").map((id) => id.trim()));
  };

  return (
    <Forms.FormSection title="Read All Messages Settings">
      <Forms.FormInput
        title="Excluded Users (Comma Separated)"
        value={excludedUsers.join(", ")}  // Display current excluded users
        onChange={handleChange}  // Update the excluded users on input change
        placeholder="Enter user IDs to exclude"
      />
    </Forms.FormSection>
  );
}
