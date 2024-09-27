import { useEffect } from "react";
import Stack from "expo-router/stack";
import { QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import Container from "@/components/Container";

import { warmGray900 } from "@/config/colors";
import { queryClient } from "@/config/queryClient";

import { AuthProvider } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Container>
            <StatusBar
              style="light"
              backgroundColor={warmGray900}
              translucent={false}
            />

            <Stack screenOptions={{ headerShown: false }} />
          </Container>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
