import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function ResetPasswordScreen() {
  // Get parameters from the URL
  const { token, email } = useLocalSearchParams();

  console.log('Reset password token:', token);
  console.log('Email:', email);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Reset Password Screen</Text>
      <Text>Token: {token}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
} 