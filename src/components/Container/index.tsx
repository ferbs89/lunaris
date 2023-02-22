import React, { ReactNode } from "react";
import { Box, StatusBar, useColorModeValue } from "native-base";

type ContainerType = {
  children?: ReactNode;
};

export default function Container({ children }: ContainerType) {
  const bg = useColorModeValue("warmGray.50", "warmGray.800");
  const bgStatusBar = useColorModeValue("#f5f5f4", "#1c1917");
  const styleStatusBar = useColorModeValue("dark-content", "light-content");

  return (
    <Box flex="1" bg={bg} safeArea>
      <StatusBar backgroundColor={bgStatusBar} barStyle={styleStatusBar} />

      {children}
    </Box>
  );
}
