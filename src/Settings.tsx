import { React, useState } from "react";
import { TextInput, Button } from "@vendetta/ui/components";
import { storage } from "@vendetta/api";

const Settings = () => {
  const [excludedUser, setExcludedUser] = useState("");

  const saveUser = () => {
    let excludedUsers = storage.get("excludedUsers", []);
    if (excludedUser && !excludedUsers.includes(excludedUser)) {
      excludedUsers.push(excludedUser);
      storage.set("excludedUsers", excludedUsers);
      console.log("Saved excluded user:", excludedUser);
      setExcludedUser(""); // Reset the input field after saving
    }
  };

  return (
    <>
      <TextInput
        label="Exclude User ID"
        value={excludedUser}
        onChange={setExcludedUser}
      />
      <Button onClick={saveUser}>Save Excluded User</Button>
    </>
  );
};

export default Settings;
