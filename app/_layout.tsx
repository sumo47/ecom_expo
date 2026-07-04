import { AppProvider } from "@/context/AppContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css"

export default function RootLayout() {
  return (
    <>
      <AppProvider>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="indexx" />
        </Stack>
      </AppProvider>
    </>
  );
}
