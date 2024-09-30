import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";

import { warmGray900 } from "@/config/colors";

import { Container } from "./styles";

type ContainerType = {
  children?: ReactNode;
};

export default function ({ children }: ContainerType) {
  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={warmGray900}
        translucent={false}
      />

      <Container>{children}</Container>
    </>
  );
}
