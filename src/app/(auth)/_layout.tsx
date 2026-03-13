import React from "react";
import { Stack } from "expo-router/stack";
const AuthLayout = () => {
  return <Stack 
  screenOptions={{
    headerShown: false,
    headerShadowVisible: false
  }}
  />;
};

export default AuthLayout;
