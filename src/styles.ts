import { ReactNative } from "@vendetta/metro/common";

const { StyleSheet } = ReactNative;

export const styles = StyleSheet.create({
    readAllButton: {
        backgroundColor: "#7289da", // Discord blurple
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    readAllText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});
