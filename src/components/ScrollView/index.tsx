import { ReactNode } from "react";

import { CustomScrollView } from "./styles";

type ScrollViewType = {
  children: ReactNode;
};

export default function ScrollView({ children }: ScrollViewType) {
  return <CustomScrollView>{children}</CustomScrollView>;
}
