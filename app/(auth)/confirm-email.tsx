import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function ConfirmEmailScreen() {
  // Get parameters from the URL
  const { token, email } = useLocalSearchParams();

  console.log('Confirm email token:', token);
  console.log('Email:', email);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Confirm Email Screen</Text>
      <Text>Token: {token}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
} 