import React from "react";
import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

import { colorModeManager } from "./config/colorModeManager";
import { queryClient } from "./config/queryClient";
import { theme } from "./config/theme";

import { AuthProvider } from "./hooks/useAuth";

import DrawerNavigator from "./routes/drawer";

export default function () {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
          <DrawerNavigator />
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
