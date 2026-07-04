import { AppProvider } from "@/context/AppContext";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css"

export default function RootLayout() {
  return (
    <>
      <AppProvider>
        {/* <StatusBar style="dark" /> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown:false}} />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </AppProvider>
    </>
  );
}
