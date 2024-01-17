import React, { ReactNode } from "react";
import { StatusBar } from "react-native";

import { warmGray900 } from "../../config/colors";

import { Container } from "./styles";

type ContainerType = {
  children?: ReactNode;
};

export default function ({ children }: ContainerType) {
  return (
    <Container>
      <StatusBar backgroundColor={warmGray900} barStyle="light-content" />

      {children}
    </Container>
  );
}
