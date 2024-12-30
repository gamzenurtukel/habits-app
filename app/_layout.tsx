import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import i18nextConfig from "@/i18n/i18nextConfig";
import { I18nextProvider } from "react-i18next";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Linking from 'expo-linking';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const i18n = i18nextConfig;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Handle deep linking
    const handleDeepLink = (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      if (path) {
        // Map the incoming path to a valid app route
        let validPath: string;
        switch (path) {
          case 'profile':
            validPath = '/(tabs)/profile';
            break;
          case 'explore':
            validPath = '/(tabs)/explore';
            break;
          default:
            validPath = '/(tabs)';
        }
        
        // Navigate to the appropriate screen
        router.push({
          pathname: validPath as any,
          params: queryParams || undefined
        });
      }
    };

    // Add event listener for deep links when app is already running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle deep link if app was launched from URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [router]);

  if (!loaded) {
    return null;
  }

  const loadingScreen = () => {
    return (
      <LinearGradient colors={["#4CAF50", "#A5D6A7"]} style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.text}>Habits App</Text>
      </LinearGradient>
    );
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={loadingScreen()} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(settings)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="loading"  />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                    // headerStyle: {
                    //   backgroundColor: "#E8F5E9",
                    // },
                    // headerTintColor: "#588157",
                    // headerTitleStyle: {
                    //   fontWeight: "bold",
                    // },
                    headerShown: false,
                  }}
                />
              </Stack>
              <StatusBar style="auto" />
              <Toast />
            </GestureHandlerRootView>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
});
