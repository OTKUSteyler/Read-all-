import { React } from "@vendetta/common";
import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

const { FormRow, FormSection, FormDivider, FormText } = Forms;

// Simple toast helper
const showToastCompat = (message, type) => {
    if (typeof showToast === "function") {
        if (showToast.length >= 2) {
            showToast(message, { type });
        } else {
            showToast(message);
        }
    }
};

export default () => {
    // Create a forceUpdate function to refresh the UI when needed
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    
    // Reset stats function
    const resetStats = () => {
        storage.unreadGuildsCount = 0;
        showToastCompat("Statistics reset", "success");
        forceUpdate();
    };

    return (
        <>
            <FormSection title="Statistics">
                <FormRow
                    label="Total unread guilds marked as read"
                    trailing={storage.unreadGuildsCount || 0}
                />
                
                <FormRow
                    label="Reset Statistics"
                    subLabel="Clear the counter for marked guilds"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_refresh_24px")} />}
                    onPress={resetStats}
                />
            </FormSection>

            <FormDivider />

            <FormSection title="Information">
                <FormText>
                    The Read-all plugin adds a button to the bottom tab bar that allows you to mark 
                    all servers and DMs as read with a single tap.
                </FormText>
                
                <FormText style={{ marginTop: 8 }}>
                    If you don't see the button, please try restarting Discord.
                </FormText>
            </FormSection>
        </>
    );
};
