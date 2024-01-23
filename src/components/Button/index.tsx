import { ReactNode } from "react";

import { TextMD } from "../Text";

import { ButtonContainer } from "./styles";

type ButtonType = {
  onPress: () => void;
  color?: string;
  children: ReactNode;
};

export default function ({ onPress, color, children }: ButtonType) {
  return (
    <ButtonContainer onPress={onPress} color={color}>
      <TextMD>{children}</TextMD>
    </ButtonContainer>
  );
}
