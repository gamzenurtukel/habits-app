import { useAppSelector } from "@/redux/app/hooks";
import { selectIsAuthenticated } from "@/redux/reducers/auth-reducer";
import { Link, Redirect } from "expo-router";
import React from "react";

const StartScreen = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  return <Redirect href="/(tabs)" />;

};

export default StartScreen;
