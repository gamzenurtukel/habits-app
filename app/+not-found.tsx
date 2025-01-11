import { Link, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Stack.Screen options={{ title: t("page_not_found") }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚫</Text>
        </View>
        <Text style={styles.title}>{t("opps_page_not_found")}</Text>
        <Text style={styles.description}>
          {t("the_page_you_are_looking_for_does_not_exist_or_has_been_moved")}
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t("go_back_to_home_page")}</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    backgroundColor: "#FFEEF0",
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  link: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
