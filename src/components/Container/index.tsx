import React, { ReactNode } from "react";

import { Container } from "./styles";

type ContainerType = {
  children?: ReactNode;
};

export default function ({ children }: ContainerType) {
  return <Container>{children}</Container>;
}
