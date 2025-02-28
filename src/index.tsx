import { React, ReactNative } from "@vendetta/metro/common";
import { View, Text, TouchableOpacity } from "@vendetta/ui/components";

export const onLoad = () => {
    console.log("Read All Plugin Loaded!");
};

export const MyButton = () => (
    <View>
        <TouchableOpacity onPress={() => alert("Button Clicked!")}>
            <Text>Click Me</Text>
        </TouchableOpacity>
    </View>
);
