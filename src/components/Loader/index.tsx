import React from "react";
import { Box, Spinner } from "native-base";

export default function () {
  return (
    <Box flex="1" alignItems="center" justifyContent="center">
      <Spinner size="lg" />
    </Box>
  );
}
