import { useAppSelector } from "@/redux/app/hooks";
import { selectIsAuthenticated } from "@/redux/reducers/auth-reducer";
import { Link, Redirect } from "expo-router";
import React from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useEffect } from "react";

// TODO Bunları daha sonra kaldırıp başka yere taşıyabiliriz.
import { adapty } from "react-native-adapty";
adapty.activate("public_live_4Hlw9dpe.NMnoQYBjNTLQofLN5fDy");

const StartScreen = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    // // OneSignal App ID'nizi burada başlatın
    // OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");

    // // Bildirim açılma olaylarını dinleyin
    // OneSignal.setNotificationOpenedHandler((notification) => {
    //   console.log("Notification opened:", notification);
    // });

    // // Uygulama çalışırken bildirimin görünümünü ayarlayın (opsiyonel)
    // OneSignal.setNotificationWillShowInForegroundHandler(
    //   (notificationEvent) => {
    //     const notification = notificationEvent.getNotification();
    //     console.log("Notification received in foreground:", notification);

    //     // Bildirimi göstermek için notificationEvent.complete() çağrılır
    //     notificationEvent.complete(notification);
    //   }
    // );

    // // Bildirim izni isteme
    // OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    //   console.log("User granted notification permission:", response);
    // });
    // Remove this method to stop OneSignal Debugging

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("ONESIGNAL_APP_ID");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener("click", (event) => {
      console.log("OneSignal: notification clicked:", event);
    });
  }, []);

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  return <Redirect href="/(tabs)" />;
};

export default StartScreen;
