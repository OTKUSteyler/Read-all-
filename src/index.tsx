import { showToast, ToastType } from "@vendetta/ui/toasts";

export default {
  onLoad: () => {
    showToast("Plugin Enabled!", ToastType.SUCCESS);
    console.log("Read All Messages Plugin Loaded!");
  },
  onUnload: () => {
    showToast("Plugin Disabled!", ToastType.INFO);
    console.log("Read All Messages Plugin Unloaded!");
  },
};
