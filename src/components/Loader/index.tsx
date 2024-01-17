import React from "react";
import { ActivityIndicator, Image } from "react-native";

import { LoaderContainer } from "./styles";

const logo = require("../../assets/logo.png");

export default function () {
  return (
    <LoaderContainer>
      <Image source={logo} resizeMode="center" />
      <ActivityIndicator size="large" />
    </LoaderContainer>
  );
}
