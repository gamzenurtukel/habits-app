import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Link } from "expo-router";
import { useGetProfileInfoQuery } from "@/redux/services/habit";
import LoadingScreen from "../loading";
import { useTranslation } from "react-i18next";

export default function ProfileScreen() {
  const {
    data: getProfileInfo,
    isLoading: getProfileInfoIsLoading,
    isSuccess: getProfileInfoIsSuccess,
    isError: getProfileInfoIsError,
    isFetching: getProfileInfoIsFetching,
  } = useGetProfileInfoQuery();

  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      {getProfileInfoIsLoading ? (
        LoadingScreen()
      ) : getProfileInfoIsError ? (
        <Text>Error..</Text>
      ) : getProfileInfoIsSuccess ? (
        <View style={styles.container}>
          <View style={styles.profileCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>
              {getProfileInfo.data.userName.toLocaleUpperCase()}
            </Text>
            <Text style={styles.subscriptionStatus}>
              {getProfileInfo.data.isSubscribed
                ? t("premium_subscriber")
                : t("free_subscriber")}
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push("/settings")}
            >
              <MaterialIcons
                name="settings"
                style={styles.settingsIcon}
                color="#588157"
              />
            </TouchableOpacity>
          </View>
          {!getProfileInfo.data.isSubscribed && (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "green",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                shadowColor: "#333",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                gap: 3,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                👑
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {t("premium_subscriber_description")}
              </Text>
            </View>
          )}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.emoji}>📅</Text>
              <Text style={styles.statNumber}>
                {getProfileInfo.data.totalDays}
              </Text>
              <Text style={styles.statLabel}>{t("total_days")}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.emoji}>📊</Text>
              <Text style={styles.statNumber}>
                {getProfileInfo.data.totalHabits}
              </Text>
              <Text style={styles.statLabel}>{t("total_habits")}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.emoji}>🔥</Text>
              <Text style={styles.statNumber}>
                {getProfileInfo.data.activeHabits}
              </Text>
              <Text style={styles.statLabel}>{t("active_habits")}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.emoji}>⏸️</Text>
              <Text style={styles.statNumber}>
                {getProfileInfo.data.passiveHabits}
              </Text>
              <Text style={styles.statLabel}>{t("passive_habits")}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subscriptionStatus: {
    fontSize: 16,
    color: "#757575",
  },
  settingsButton: {
    position: "absolute",
    top: -5,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsIcon: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
  },
  statBox: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#588157",
  },
  statLabel: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
  },
});
