import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function SignInWithGoogleAppleScreen() {
  const [loading, setLoading] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);

  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#588157", "#E8F5E9"]} style={styles.container}>
        <View style={styles.loginContainer}>
          <View>
            <View
              style={{
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text>
                <Image
                  source={require("../../assets/images/habitz_logo.png")}
                  style={{ width: 80, height: 80 }}
                />
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text style={styles.title}>{`${t(
                  "welcome_to_habitz"
                )}👋`}</Text>
                <Text
                  style={{
                    color: "#191919",
                    fontSize: 18,
                  }}
                >
                  {t("Sign_in_to_discover_what_you_can_do_on_habitz")}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                router.push("/(auth)/sign-up");
              }}
              disabled={loading}
            >
              {loading && currentButton === "apple" ? (
                <ActivityIndicator color="white" style={styles.buttonIcon} />
              ) : (
                <Image
                  source={require("../../assets/images/apple_icon.png")}
                  style={styles.buttonIcon}
                />
              )}
              <Text style={styles.buttonText}>{t("continue_with_apple")} </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // handleGoogleSignIn();
              }}
              disabled={loading}
            >
              {loading && currentButton === "google" ? (
                <ActivityIndicator color="white" style={styles.buttonIcon} />
              ) : (
                <Image
                  source={require("../../assets/images/google_icon.png")}
                  style={styles.buttonIcon}
                />
              )}
              <Text style={styles.buttonText}>{t("continue_with_google")}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "gray",
                }}
              />
              <Text style={{ marginHorizontal: 10, color: "gray" }}>
                {t("or")}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "gray",
                }}
              />
            </View>
            <TouchableOpacity
              style={[styles.buttonSignin]}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={styles.buttonTextSignin}>{t("create_account")}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                color: "#555",
                fontSize: 14,
              }}
            >
              {t(
                "by_signing_up_you_agree_to_the_terms_of_service_and_privacy_policy_including_cookie_use"
              )}
            </Text>
            <Text
              style={{
                color: "#555",
                fontSize: 14,
              }}
            >
              {t("already_have_an_account")}{" "}
              <Link href="/(auth)/sign-in">
                <Text
                  style={{
                    color: "#1B5E20",
                    fontWeight: "bold",
                  }}
                >
                  {t("sign_in")}
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    color: "#191919",
  },
  buttonIcon: {
    position: "absolute",
    left: 20,
    top: 10,
    width: 24,
    height: 24,
  },
  buttonSignin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonTextSignin: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderColor: "#000000",
    borderWidth: 1,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
