import React from "react";
import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { colorModeManager } from "./config/colorModeManager";
import { queryClient } from "./config/queryClient";
import { theme } from "./config/theme";

import { AuthProvider } from "./hooks/useAuth";

import Routes from "./routes";

export default function () {
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
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
