import { ReactNode } from "react";
import { TagContainer } from "./styles";

type TagType = {
  color: string;
  width?: number;
  children: ReactNode;
};

export default function ({ color, width, children }: TagType) {
  return (
    <TagContainer color={color} width={width}>
      {children}
    </TagContainer>
  );
}
