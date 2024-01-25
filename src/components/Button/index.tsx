import { ReactNode } from "react";

import { primary600 } from "../../config/colors";

import { TextBoldSM } from "../Text";

import { ButtonContainer } from "./styles";

type ButtonType = {
  onPress: () => void;
  mode?: "default" | "outline";
  color?: string;
  textColor?: string;
  children: ReactNode;
};

export default function ({
  onPress,
  mode = "default",
  color = primary600,
  children,
}: ButtonType) {
  return (
    <ButtonContainer onPress={onPress} mode={mode} color={color}>
      <TextBoldSM color={mode === "outline" && color}>{children}</TextBoldSM>
    </ButtonContainer>
  );
}
