import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";

import { Content } from "./styles";

type ContainerType = {
  children?: ReactNode;
};

export default function Container({ children }: ContainerType) {
  return (
    <>
      <StatusBar translucent={false} />

      <Content>{children}</Content>
    </>
  );
}
