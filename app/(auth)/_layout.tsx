// import { useAppSelector } from "@/redux/app/hooks";
// import { selectIsAuthenticated } from "@/redux/reducers/auth-reducer";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  //   const isAuthenticatedd = useAppSelector(selectIsAuthenticated);
  //   if (isAuthenticatedd) return <Redirect href="/home" />;
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in-with-google-apple"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
