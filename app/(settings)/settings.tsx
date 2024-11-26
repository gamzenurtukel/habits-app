import { Text, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function SettingsScreen() {
    const settingsData = [
        {

            title: "Hesap",
            data: [
                {
                    title: "Profil",
                    icon: "person",
                },
                {
                    title: "Şifre Değiştir",
                    icon: "lock",
                },
                {
                    title: "Bildirimler",
                    icon: "notifications",
                },
            ],
        },
        {

            title: "Uygulama",
            data: [
                {
                    title: "Tema",
                    icon: "palette",
                },
                {
                    title: "Dil",
                    icon: "language",
                },
                {
                    title: "Hakkında",
                    icon: "info",
                },
            ],
        },
        {

            title: "Destek",
            data: [
                {
                    title: "Yardım",
                    icon: "help",
                },
                {
                    title: "Geri Bildirim",
                    icon: "feedback",
                },
                {
                    title: "Hata Bildir",
                    icon: "bug-report",
                },
            ],
        }

    ];
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <MaterialIcons name="chevron-left" size={24} color="#588157" />
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                        <Text style={styles.headerText}>Settings</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    {settingsData.map((setting, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#588157" }}>{setting.title}</Text>
                            {setting.data.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialIcons name={item.icon as any} size={24} color="#588157" />
                                        <Text style={{ marginLeft: 10 }}>{item.title}</Text>
                                    </View>
                                    <MaterialIcons name="chevron-right" size={24} color="#588157" />
                                </View>
                            ))}
                        </View>
                    ))}
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
    header: {
        backgroundColor: "#E8F5E9",
        shadowColor: "#000",
        shadowOpacity: 0.09,
        shadowRadius: 3.84,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        height: 50,
        flexDirection: "row",
        alignItems: "center",

    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#588157",
        margin: 10,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});
