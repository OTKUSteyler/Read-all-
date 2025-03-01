
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from '@vendetta/ui/assets';

export default {
  onLoad: () => {
    showToast("Read All Messages Plugin Enabled!", getAssetIDByName("Check"));
    
    console.log("✅ Read All Messages Plugin Loaded!");
  },
  onUnload: () => {
    showToast("Read All Messages Plugin Disabled!", getAssetIDByName("Check"));
    console.log("❌ Read All Messages Plugin Unloaded!");
  },
};

