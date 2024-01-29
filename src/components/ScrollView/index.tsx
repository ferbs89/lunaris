import { ReactNode } from "react";

import { ScrollView } from "./styles";

type ScrollViewType = {
  children: ReactNode;
};

export default function ({ children }: ScrollViewType) {
  return <ScrollView>{children}</ScrollView>;
}
