import React from "react";
import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";

import { colorModeManager } from "./config/colorModeManager";
import { queryClient } from "./config/queryClient";

import DrawerNavigator from "./routes/drawer";

export default function () {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <QueryClientProvider client={queryClient}>
        <DrawerNavigator />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
