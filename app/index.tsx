import { useAppSelector } from "@/redux/app/hooks";
import { selectIsAuthenticated } from "@/redux/reducers/auth-reducer";
import { Link, Redirect } from "expo-router";
import React from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useEffect } from "react";
import i18nextConfig from "@/i18n/i18nextConfig";

// TODO Bunları daha sonra kaldırıp başka yere taşıyabiliriz.
import { adapty } from "react-native-adapty";
adapty.activate("public_live_4Hlw9dpe.NMnoQYBjNTLQofLN5fDy");

const StartScreen = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const i18n = i18nextConfig;

  console.log("language", i18n.language);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("dff0b398-b1ee-4ddd-9b48-e23b3bb4de1d");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);
    OneSignal.User.setLanguage(i18n.language || "tr");

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener("click", (event) => {
      console.log("OneSignal: notification clicked:", event);
    });

    OneSignal.InAppMessages.addTrigger("key", "value");

    // location permission
    OneSignal.Location.requestPermission();
  }, []);

  if (!isAuthenticated)
    return <Redirect href="/(auth)/sign-in-with-google-apple" />;

  return <Redirect href="/(tabs)" />;
};

export default StartScreen;
