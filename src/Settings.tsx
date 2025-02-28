import { React, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, TextInput, Button } from "@vendetta/ui/components";
import { storage } from "@vendetta/api";
import styles from "./style"; // Import styles

const Settings = () => {
  // Load excluded users from storage
  const [excluded, setExcluded] = useState(storage.get("excludedUsers", []).join(", "));

  const handleExcludedChange = (value) => {
    const users = value.split(",").map((user) => user.trim());
    setExcluded(value);
    storage.set("excludedUsers", users);
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Enter user IDs to exclude from "Mark All as Read":</Text>
      <TextInput
        style={styles.input}
        value={excluded}
        onChange={handleExcludedChange}
        placeholder="123456, 7891011"
      />
      <Button style={styles.button} onPress={() => storage.set("excludedUsers", [])}>
        Clear Exclusions
      </Button>
    </ScrollView>
  );
};

export default Settings;
