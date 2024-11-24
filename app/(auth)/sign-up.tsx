import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Link, Stack } from "expo-router";
import { signUpDataSchema } from "@/lib/validations/sign-up-validation";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSingUp = () => {
    const formData = { email, password, name, phone };

    const result = signUpDataSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
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

    Toast.show({
      type: "success",
      position: "top",
      text1: "Üyelik başarılı!",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 50,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.backgroundGradient} />

        <View style={styles.content}>
          <Text style={styles.title}>Habits App</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ad-Soyad</Text>
            <TextInput
              style={styles.input}
              placeholder="Adınızı girin"
              value={name}
              onChangeText={setName}
              secureTextEntry
              placeholderTextColor="#B0B0B0"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefon</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefon numaranızı girin"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              secureTextEntry
              placeholderTextColor="#B0B0B0"
            />
          </View>

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

          <TouchableOpacity onPress={handleSingUp} style={styles.button}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.text}>
              Zaten hesabınız var mı?{" "}
              <Link href="/(auth)/sign-in">
                <Text style={styles.boldText}>Giriş Yap</Text>
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
    height: "66%",
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
});

export default SignUpScreen;
