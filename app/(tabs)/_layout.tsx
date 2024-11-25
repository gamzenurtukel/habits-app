import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#B9C4BA",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: '#E8F5E9',
            height: 60,

          },
          default: {
            position: 'absolute',
            backgroundColor: '#E8F5E9',
            height: 60,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color="#A6B0A7" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor:"#388E3C", justifyContent: 'center', alignItems: 'center', top: -5, borderWidth: 1, borderColor: "#388E3C" }}><IconSymbol size={28} name="plus" color="#A6B0A7" />
            <IconSymbol size={28} name="plus.app.fill" color="#E8F5E9" /></View>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) =>
            <IconSymbol size={28} name="person.fill" color="#A6B0A7" />,
        }}
      />
    </Tabs>
  );
}
