import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useTranslation } from "react-i18next";

const WebViewScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialIcons name="chevron-left" size={24} color="#588157" />
          <Text style={styles.headerText}>{t("return_to_settings")}</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://habitz.pro/" }}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  header: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#588157",
  },
});

export default WebViewScreen;
