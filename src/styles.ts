import { ReactNative } from "@vendetta/metro/common";

const { StyleSheet } = ReactNative;

export const styles = StyleSheet.create({
    readAllButton: {
        backgroundColor: "#7289da", // Discord blurple color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    readAllText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
