import { showToast, ToastType } from "@vendetta/ui/toasts";

export default {
  onLoad: () => {
    showToast("Read All Messages Plugin Enabled!", ToastType.SUCCESS);
    console.log("✅ Read All Messages Plugin Loaded!");
  },
  onUnload: () => {
    showToast("Read All Messages Plugin Disabled!", ToastType.INFO);
    console.log("❌ Read All Messages Plugin Unloaded!");
  },
};
