import React from "react";
import { Box, Image, Spinner } from "native-base";

const logo = require("../../assets/logo.png");

export default function () {
  return (
    <Box flex="1" alignItems="center" justifyContent="center">
      <Image source={logo} alt="Lunaris" width={32} height={32} mb="8" />
      <Spinner size="lg" />
    </Box>
  );
}
