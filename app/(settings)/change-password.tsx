import { changePasswordDataSchema } from "@/lib/validations/change-password-validation";
import { useChangePasswordMutation } from "@/redux/services/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { t } = useTranslation();

  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword = async () => {
    try {
      const formData = { currentPassword, newPassword };
      const validation = changePasswordDataSchema.safeParse(formData);

      if (!validation.success) {
        validation.error.issues.forEach((issue) => {
          showToast("error", t(issue.message));
        });
        return;
      }

      const result = await changePassword(formData);

      if (!result.data?.isSuccessful) {
        const errorMessage =
          result?.error &&
          "data" in result.error &&
          Array.isArray((result.error as any).data.errors)
            ? (result.error as any).data.errors[0]
            : t("an_error_occurred_while_change_password");
        showToast("error", errorMessage);
        return;
      }

      showToast("success", t("change_password_success"));
      setTimeout(() => router.push("/(settings)/settings"), 2000);
    } catch (error) {
      console.log("error", error);
      showToast("error", t("an_error_occurred_while_change_password"));
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", gap: 20 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialIcons name="chevron-left" size={24} color="#588157" />
          <Text style={styles.headerText}>{t("return_to_settings")}</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>
      <View style={[styles.content, { marginTop: 30 }]}>
        <View style={{ marginBottom: 20, gap: 10 }}>
          <Text style={styles.title}>{t("change_password")}</Text>
          <Text style={{ color: "#555", marginBottom: 20 }}>
            {t("change_password_description")}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("current_password")}</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            placeholder={t("current_password_enter")}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("new_password")}</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            placeholder={t("new_password_enter")}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>{t("confirm_new_password")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  header: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#588157",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "##388E3C",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "##388E3C",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    color: "#333",
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
