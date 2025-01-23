import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useLogoutMutation } from "@/redux/services/auth";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const [logout] = useLogoutMutation();

  const router = useRouter();

  const { t } = useTranslation();

  const settingsData = [
    {
      title: t("account"),
      data: [
        {
          title: t("profile"),
          icon: "person",
        },
        {
          title: t("change_password"),
          icon: "lock",
        },
        {
          title: t("notifications"),
          icon: "notifications",
        },
      ],
    },
    {
      title: t("aplication"),
      data: [
        {
          title: t("language"),
          icon: "language",
        },
        {
          title: t("about"),
          icon: "info",
        },
        {
          title: t("terms_of_use"),
          icon: "description",
        },
        {
          title: t("privacy_policy"),
          icon: "privacy-tip",
        },
      ],
    },
    {
      title: t("support"),
      data: [
        {
          title: t("help"),
          icon: "help",
        },
        {
          title: t("feedback"),
          icon: "feedback",
        },
        {
          title: t("report_bug"),
          icon: "bug-report",
        },
      ],
    },
  ];

  const handleSignOut = async () => {
    try {
      const result = await logout();

      if (!result.data?.isSuccessful) {
        const errorMessage =
          result?.error &&
          "data" in result.error &&
          Array.isArray((result.error as any).data.errors)
            ? (result.error as any).data.errors[0]
            : t("an_error_occurred_while_sign_out");

        showToast("error", errorMessage);
        return;
      }
      showToast("success", t("sign_out_success"));
      router.push("/(auth)/sign-in-with-google-apple");
    } catch (error) {
      console.log("error sign out", error);
      showToast("error", t("an_error_occurred_while_sign_out"));
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      position: "bottom",
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 50,
    });
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
            <Text style={styles.headerText}>{t("settings")}</Text>
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
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    if (
                      item.title === t("about") ||
                      item.title === t("terms_of_use") ||
                      item.title === t("privacy_policy")
                    ) {
                      router.push("/(settings)/web-view");
                    } else if (item.title === t("change_password")) {
                      router.push("/(settings)/change-password");
                    }
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
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>{t("sign_out")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  header: {
    backgroundColor: "#ffffff",
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
