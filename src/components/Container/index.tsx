import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";

import { Container } from "./styles";

type ContainerType = {
  children?: ReactNode;
};

export default function ({ children }: ContainerType) {
  return (
    <>
      <StatusBar translucent={false} />

      <Container>{children}</Container>
    </>
  );
}
