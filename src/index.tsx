import { showToast } from "@vendetta/ui/toasts";

export default {
  onLoad: () => {
    showToast("Read All Messages Plugin Enabled!", { type: "success" });
    console.log("✅ Read All Messages Plugin Loaded!");
  },
  onUnload: () => {
    showToast("Read All Messages Plugin Disabled!", { type: "info" });
    console.log("❌ Read All Messages Plugin Unloaded!");
  },
};
