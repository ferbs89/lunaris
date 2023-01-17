import React from "react";
import { Box, useColorModeValue } from "native-base";

export default function Container({ children }) {
  const bg = useColorModeValue("warmGray.50", "warmGray.800");

  return (
    <Box flex="1" bg={bg} safeArea>
      {children}
    </Box>
  );
}
