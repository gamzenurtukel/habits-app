import { Tabs, router } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#B9C4BA",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#E8F5E9",
            height: 90,
            borderColor: "#D0DCD1",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
            borderTopWidth: 0,
          },
          android: {
            position: "absolute",
            backgroundColor: "#E8F5E9",
            height: 90,
            borderColor: "#D0DCD1",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
            borderTopWidth: 0,
          },
          default: {
            position: "absolute",
            backgroundColor: "#E8F5E9",
            height: 90,
            borderColor: "#D0DCD1",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
            borderTopWidth: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${t("today")}`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color="#A6B0A7" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TouchableOpacity onPress={() => router.push("/modal")}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "#388E3C",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -5,
                  borderWidth: 1,
                  borderColor: "#388E3C",
                }}
              >
                <IconSymbol size={28} name="plus" color="#E8F5E9" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: `${t("profile")}`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color="#A6B0A7" />
          ),
        }}
      />
    </Tabs>
  );
}
