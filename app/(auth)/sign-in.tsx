import { signInDataSchema } from "@/lib/validations/sign-in-validation";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, Stack } from "expo-router";
import { useLoginMutation } from "@/redux/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const { t } = useTranslation();

  const [login] = useLoginMutation();

  const handleSignIn = async () => {
    try {
      const formData = { email, password, rememberMe };
      const validation = signInDataSchema.safeParse(formData);

      if (!validation.success) {
        validation.error.issues.forEach((issue) => {
          showToast("error", t(issue.message));
        });
        return;
      }

      const result = await login({
        username: email,
        password,
        rememberMe,
      });

      if (!result.data?.isSuccessful) {
        const errorMessage =
          result?.error &&
          "data" in result.error &&
          Array.isArray((result.error as any).data.errors)
            ? (result.error as any).data.errors[0]
            : t("an_error_occurred_while_signing_in");
        showToast("error", errorMessage);
        return;
      }

      showToast("success", t("sign_in_success"));
      setTimeout(() => router.push("/(tabs)"), 2000);
    } catch (error) {
      console.error("Sign-in error:", error);
      showToast("error", t("an_error_occurred_while_signin_in"));
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              gap: 50,
            }}
          >
            <View style={styles.backgroundGradient} />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text>
                <Image
                  source={require("../../assets/images/habitz_logo.png")}
                  style={{ width: 80, height: 80 }}
                />
              </Text>
              <Text style={styles.title}>Habitz</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t("email")}
                  {/* E-posta */}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enter_your_email")}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#B0B0B0"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("password")}</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder={t("enter_your_password")}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible} // Şifre görünürlüğünü kontrol et
                    placeholderTextColor="#B0B0B0"
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.visibilityToggle}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={24}
                      color="#B0B0B0"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <Pressable
                  role="checkbox"
                  aria-checked={rememberMe}
                  style={[
                    styles.checkboxBase,
                    rememberMe && styles.checkboxChecked,
                  ]}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </Pressable>
                <Text style={styles.checkboxLabel}>{`${t(
                  "remember_me"
                )}`}</Text>
              </View>

              <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>{t("sign_in")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkContainer}>
                <Text style={styles.linkText}>{t("forgot_password")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkContainer}>
                <Text style={styles.text}>
                  {t("dont_have_an_account")}{" "}
                  <Link href="/(auth)/sign-up">
                    <Text style={styles.boldText}>{t("sign_up")}</Text>
                  </Link>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#588157",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    height: "61%",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
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
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    textAlign: "center",
    color: "#1B5E20",
    fontSize: 14,
  },
  text: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
    color: "#1B5E20",
  },
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#1B5E20",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#1B5E20",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#1B5E20",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  visibilityToggle: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default SignInScreen;
