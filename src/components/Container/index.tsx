import React, { ReactNode } from "react";
import { Box, StatusBar, useColorModeValue } from "native-base";

type ContainerType = {
  statusBarTheme?: "default" | "primary";
  children?: ReactNode;
};

export default function Container({
  statusBarTheme = "primary",
  children,
}: ContainerType) {
  const bg = useColorModeValue("warmGray.50", "warmGray.800");

  const statusBarStyle = useColorModeValue("dark-content", "light-content");
  const statusBarBgDefault = useColorModeValue("#fafaf9", "#292524");
  const statusBarBgPrimary = useColorModeValue("#f5f5f4", "#1c1917");

  return (
    <Box flex="1" bg={bg} safeArea>
      <StatusBar
        backgroundColor={
          statusBarTheme === "default" ? statusBarBgDefault : statusBarBgPrimary
        }
        barStyle={statusBarStyle}
      />

      {children}
    </Box>
  );
}
