import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Image, Text, StyleSheet } from "react-native";

export default function LoadingScreen() {
    return (
        <LinearGradient colors={["#4CAF50", "#A5D6A7"]} style={styles.container}>
            <Image source={require("../assets/images/habitz_logo.png")} style={{ width: 100, height: 100 }} />
            <Text style={styles.text}>Habitz</Text>
            <ActivityIndicator size="large" color="#FFFFFF" />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFFFF",
        marginBottom: 30,
        textShadowColor: "gray",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
});