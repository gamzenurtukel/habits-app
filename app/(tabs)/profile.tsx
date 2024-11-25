import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardProfile}>
                        <Image
                            source={{ uri: "https://via.placeholder.com/150" }}
                            style={styles.reactLogo}
                        />
                        <Text>John Doe</Text>
                    </View>
                    <TouchableOpacity >
                      
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E8F5E9",
        // flex: 1,
        height: "100%",
        // padding: 10,
    },
    reactLogo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    card: {
        backgroundColor: "#E8F5E9",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardProfile: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: 10,

    },


})
