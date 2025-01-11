import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, Stack } from "expo-router";
import { signUpDataSchema } from "@/lib/validations/sign-up-validation";
import { useRegisterMutation } from "@/redux/services/auth";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [register] = useRegisterMutation();

  const router = useRouter();

  const { t } = useTranslation();

  const handleSingUp = async () => {
    try {
      const formData = { email, password, name, phone, surname };

      const resultValidation = signUpDataSchema.safeParse(formData);

      if (!resultValidation.success) {
        resultValidation.error.issues.forEach((issue) => {
          console.log("issue", issue.message);
          Toast.show({
            type: "error",
            position: "top",
            text1: issue.message,
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
        });
        return;
      }
      const result = await register({
        email,
        password,
        name,
        phoneNumber: phone,
        surname,
        countryId: 1,
      })
        .then((res) => {
          console.log("result", result);
          console.log("Kayıt başarılı:", res);

          Toast.show({
            type: "success",
            position: "top",
            text1: t("sign_up_success"),
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
          setTimeout(() => {
            router.push("/(auth)/sign-in");
          }, 2000);
        })
        .catch((error) => {
          console.error("Kayıt sırasında hata oluştu:", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: t("an_error_occurred_while_sign_up"),
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
        });
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: t("an_error_occurred_while_sign_up"),
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
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
            }}
          >
            <View style={styles.backgroundGradient} />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/habitz_logo.png")}
                style={{ width: 80, height: 80 }}
              />

              <Text style={styles.title}>Habitz</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("name")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enter_your_name")}
                  value={name}
                  onChangeText={setName}
                  secureTextEntry
                  placeholderTextColor="#B0B0B0"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("surname")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enter_your_surname")}
                  value={surname}
                  onChangeText={setSurname}
                  secureTextEntry
                  placeholderTextColor="#B0B0B0"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("phone")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enter_your_phone")}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  secureTextEntry
                  placeholderTextColor="#B0B0B0"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("email")}</Text>
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
                <TextInput
                  style={styles.input}
                  placeholder={t("enter_your_password")}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#B0B0B0"
                />
              </View>

              <TouchableOpacity onPress={handleSingUp} style={styles.button}>
                <Text style={styles.buttonText}>{t("sign_up")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkContainer}>
                <Text style={styles.text}>
                  {t("already_have_an_account")}{" "}
                  <Link href="/(auth)/sign-in">
                    <Text style={styles.boldText}>{t("sign_in")}</Text>
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
    height: "80%",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: "#FFFFFF",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
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
});

export default SignUpScreen;
