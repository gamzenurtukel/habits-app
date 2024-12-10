import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useLogoutMutation } from "@/redux/services/auth";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [logout] = useLogoutMutation();

  const router = useRouter();

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
    },
  ];

  const handleSignOut = async () => {
    try {
      const result = await logout({});
      console.log("result", result);
      console.log("Çıkış Yapıldı", result);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Çıkış Yapıldı",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
      setTimeout(() => {
        router.push("/(auth)/sign-in");
      }, 1000);
    } catch (error) {
      console.log("Çıkış Yapılamadı", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Çıkış Yapılamadı",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={24} color="#588157" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
        <View style={styles.content}>
          {settingsData.map((setting, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#588157" }}
              >
                {setting.title}
              </Text>
              {setting.data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name={item.icon as any}
                      size={24}
                      color="#588157"
                    />
                    <Text style={{ marginLeft: 10 }}>{item.title}</Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="#588157"
                  />
                </View>
              ))}
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Çıkış Yap</Text>
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
  button: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
