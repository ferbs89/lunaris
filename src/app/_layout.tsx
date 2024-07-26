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

import Container from "@/components/Container";

import { warmGray900 } from "@/config/colors";
import { queryClient } from "@/config/queryClient";

import { AuthProvider } from "@/hooks/useAuth";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Container>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarTranslucent: false,
                statusBarColor: warmGray900,
              }}
            />
          </Container>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
