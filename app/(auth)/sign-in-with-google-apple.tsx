import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAppleWithSignInMutation } from "@/redux/services/auth";
import Toast from "react-native-toast-message";

export default function SignInWithGoogleAppleScreen() {
  const [loading, setLoading] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);

  const { t } = useTranslation();

  const [appleWithSignIn] = useAppleWithSignInMutation();

  const validateWithBackend = async (credential: any, type: string) => {
    try {
      let payload: any = {};

      if (type === "apple") {
        payload = {
          identityToken: credential.identityToken,
          authorizationCode: credential.authorizationCode,
        };

        if (credential.fullName?.familyName || credential.fullName?.givenName) {
          payload.appleName = `${credential.fullName?.givenName || ""} ${
            credential.fullName?.familyName || ""
          }`.trim();
        }
      } else if (type === "google") {
        payload = {
          idToken: credential.idToken,
          user: {
            email: credential.user.email,
            name: credential.user.name,
          },
        };
      }

      // Detaylı log
      console.log(`\n=== ${type.toUpperCase()} SIGN IN DATA ===`);
      console.log("Credential:", credential);
      console.log("\n=== REQUEST PAYLOAD ===");
      console.log(JSON.stringify(payload, null, 2));
      console.log("\n========================");

      try {
        if (payload) {
          const response = await appleWithSignIn(payload);

          if (!response.data?.isSuccessful) {
            showToast("error", t("an_error_occurred_while_signing_in"));
            return;
          }
          showToast("success", t("sign_in_success"));
        } else {
          console.log("Payload is empty.");
          showToast("error", "Payload is empty.");
        }
      } catch (error) {
        console.error("Backend validation error:", error);
        showToast("error", "Backend validation error.");
        throw error;
      }
    } catch (error) {
      console.error("Backend validation error:", error);
      showToast("error", "Backend validation error.");
      throw error;
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setCurrentButton("apple" as any);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const validationResult = await validateWithBackend(credential, "apple");
      console.log("Validation result:", validationResult);
    } catch (error) {
      if ((error as any).code === "ERR_REQUEST_CANCELED") {
        console.log("User canceled Apple Sign In");
        showToast("error", "User canceled Apple Sign In");
      } else {
        console.log("Apple Sign In error:", error);
        showToast("error", "Apple Sign In error");
      }
    } finally {
      setLoading(false);
      setCurrentButton(null);
    }
  };

  // const handleGoogleSignIn = async () => {

  //   try {
  //     setLoading(true);
  //     setCurrentButton("google");

  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signIn();
  //     const tokens = await GoogleSignin.getTokens();

  //     // Detaylı Google Sign In logları
  //     console.log("\n=== GOOGLE SIGN IN DETAILS ===");
  //     console.log("ID Token:", tokens.idToken);
  //     console.log("Access Token:", tokens.accessToken);

  //     const currentUser = await GoogleSignin.getCurrentUser();
  //     console.log("User Info:", {
  //       email: currentUser?.email,
  //       name: currentUser?.name,
  //       familyName: currentUser?.familyName,
  //       givenName: currentUser?.givenName,
  //       id: currentUser?.id,
  //       photo: currentUser?.photo,
  //     });
  //     console.log("\n========================");

  //     const validationResult = await validateWithBackend(
  //       {
  //         idToken: tokens.idToken,
  //         user: currentUser,
  //       },
  //       "google"
  //     );
  //     console.log("Validation result:", validationResult);
  //   } catch (error) {
  //     if (error.code === "SIGN_IN_CANCELLED") {
  //       console.log("User canceled Google Sign In");
  //     } else {
  //       console.log("Google Sign In error:", error);
  //     }
  //   } finally {
  //     setLoading(false);
  //     setCurrentButton(null);
  //   }
  // };

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
              onPress={handleAppleSignIn}
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
