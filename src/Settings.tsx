import { React } from "@vendetta";
import { Forms } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

// Debugging: Check initial excluded users
console.log("Initial excluded users:", storage.get("excludedUsers"));

export default function Settings() {
  const excludedUsers = storage.get("excludedUsers", []);
  
  const handleChange = (value: string) => {
    console.log("Updated excluded users:", value);
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
