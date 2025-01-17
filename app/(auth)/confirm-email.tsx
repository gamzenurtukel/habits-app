import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useConfirmEmailMutation } from "@/redux/services/auth";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function ConfirmEmailScreen() {
  const { token: tokenParam, email: emailParam } = useLocalSearchParams();
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const router = useRouter();
  const { t } = useTranslation();

  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();

  const handleConfirmEmail = async () => {
    try {
      const response = await confirmEmail({ token, email });
      if (!response.data?.isSuccessful) {
        const errorMessage =
          response?.error &&
          "data" in response.error &&
          Array.isArray((response.error as any).data.errors)
            ? (response.error as any).data.errors[0]
            : t("an_error_occurred_while_confirm_email");
        showToast("error", errorMessage);
        return;
      }
      showToast("success", t("confirm_email_success"));
      setTimeout(() => router.push("/(auth)/sign-in"), 2000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("an_error_occurred_while_confirm_email"),
      });
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
      <View style={styles.container2}>
        <View style={styles.backgroundGradient} />
        <View>
          <Text style={styles.title}>{t("confirm_email")}</Text>
          <Text style={styles.description}>
            {t("confirm_email_description")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmEmail}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{t("confirm")}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#588157",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    height: "61%",
  },
  container2: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
    paddingBlock: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  button: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
