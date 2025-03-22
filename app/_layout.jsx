import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SessionProvider } from '../context/session';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Righteous': Righteous_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
            presentation: 'card',
            animation: 'default',
          }}
        />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}