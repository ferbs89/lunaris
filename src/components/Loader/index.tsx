import React from "react";
import { ActivityIndicator } from "react-native";

import { trueGray50 } from "../../config/colors";

import Logo from "../Logo";

import { LoaderContainer, LoaderLogoContainer } from "./styles";

export default function () {
  return (
    <LoaderContainer>
      <LoaderLogoContainer>
        <Logo />
      </LoaderLogoContainer>

      <ActivityIndicator size="large" color={trueGray50} />
    </LoaderContainer>
  );
}
