import { useAppSelector } from "@/redux/app/hooks";
import { selectIsAuthenticated } from "@/redux/reducers/auth-reducer";
import { Link, Redirect } from "expo-router";
import React from "react";

// TODO Bunları daha sonra kaldırıp başka yere taşıyabiliriz. 
import { adapty } from 'react-native-adapty';
adapty.activate('public_live_4Hlw9dpe.NMnoQYBjNTLQofLN5fDy');


const StartScreen = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  return <Redirect href="/(tabs)" />;

};

export default StartScreen;
