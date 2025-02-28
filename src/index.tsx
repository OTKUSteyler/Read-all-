import { showToast, ToastType } from "@vendetta/ui/toasts";

export default {
  onLoad: () => {
    showToast("Read All Messages Plugin Loaded!", ToastType.SUCCESS);
    console.log("Read All Messages Plugin Loaded!");
  },
  onUnload: () => {
    showToast("Plugin Unloaded!", ToastType.INFO);
    console.log("Read All Messages Plugin Unloaded!");
  },
};
