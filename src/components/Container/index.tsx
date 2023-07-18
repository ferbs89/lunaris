import React, { ReactNode } from "react";
import { Box, StatusBar, useColorModeValue } from "native-base";

type ContainerType = {
  children?: ReactNode;
};

export default function Container({ children }: ContainerType) {
  const bg = useColorModeValue("warmGray.50", "warmGray.900");

  const statusBarStyle = useColorModeValue("dark-content", "light-content");
  const statusBarBg = useColorModeValue("#fafaf9", "#1c1917");

  return (
    <Box flex="1" bg={bg} safeArea>
      <StatusBar backgroundColor={statusBarBg} barStyle={statusBarStyle} />

      {children}
    </Box>
  );
}
