import { signInDataSchema } from "@/lib/validations/sign-in-validation";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, Stack } from "expo-router";
import { useLoginMutation } from "@/redux/services/auth";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const [login] = useLoginMutation();

  const handleSingIn = async () => {
    try {
      const formData = { email, password, rememberMe };
      const resultValidation = signInDataSchema.safeParse(formData);

      if (!resultValidation.success) {

        resultValidation.error.issues.forEach((issue) => {
          console.log("issue", issue.message);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: issue.message,
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
        });
        return;
      }

      const result = await login({
        username: email,
        password: password,
        rememberMe: rememberMe,
      });
      console.log("result", result);
      console.log("Giriş başarılı:", result);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Giriş başarılı!",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });

      setTimeout(() => {
        router.push("/(tabs)");
      }, 2000);

    } catch (error) {
      console.log("giriş başarısız", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Giriş sırasında hata oluştu",
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
        <View style={styles.backgroundGradient} />

        <View style={styles.content}>
          <Text style={styles.title}>Habits App</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              placeholder="E-postanızı girin"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#B0B0B0"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi girin"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#B0B0B0"
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Pressable
              role="checkbox"
              aria-checked={rememberMe}
              style={[styles.checkboxBase, rememberMe && styles.checkboxChecked]}
              onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && <Ionicons name="checkmark" size={20} color="white" />}
            </Pressable>
            <Text style={styles.checkboxLabel}>{`Remember Me`}</Text>
          </View>

          <TouchableOpacity onPress={handleSingIn} style={styles.button}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.text}>
              Henüz hesabınız yok mu?{" "}
              <Link href="/(auth)/sign-up">
                <Text style={styles.boldText}>Kayıt Ol</Text>
              </Link>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#588157",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    height: "56%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
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
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#1B5E20",
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: "#1B5E20",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,

  },
  checkboxLabel: {
    fontSize: 16,
    color: "#1B5E20",

  },
});

export default SignInScreen;
