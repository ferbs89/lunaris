import React from "react";
import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";

import { colorModeManager } from "./config/colorModeManager";
import { queryClient } from "./config/queryClient";

import { AuthProvider } from "./hooks/useAuth";

import DrawerNavigator from "./routes/drawer";

export default function () {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider colorModeManager={colorModeManager}>
          <DrawerNavigator />
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
