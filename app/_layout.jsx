import { View } from "react-native";
import { Stack } from "expo-router";
import { SessionProvider } from "../context/session";
import { SubjectsProvider } from "../context/SubjectsContext"; // 👈 Nueva importación

export default function RootLayout() {
  return (
    <SubjectsProvider> {/* 👈 Envuelve con el provider */}
      <SessionProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" />
            <Stack.Screen name="singUp" />
          </Stack>
        </View>
      </SessionProvider>
    </SubjectsProvider>
  );
}