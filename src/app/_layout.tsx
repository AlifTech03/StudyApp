import { Stack } from "expo-router";
import React from "react";
import "../global.css";
const RootLayout = () => {
  const isloggedIn = false; // TODO: Replace with actual authentication logic
  return (
    <Stack>
      <Stack.Protected guard={!isloggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isloggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
