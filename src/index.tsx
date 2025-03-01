import { showToast, ToastType } from "@vendetta/ui/toasts";

export default {
  onLoad: () => {
    showToast("Read All Messages Plugin Loaded!", ToastType.SUCCESS);
  },
  onUnload: () => {
    showToast("Plugin Unloaded!", ToastType.INFO);
  },
};
