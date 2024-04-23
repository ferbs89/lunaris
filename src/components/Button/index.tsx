import { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

import { primary, trueGray50 } from "../../config/colors";

import { TextBoldSM } from "../Text";

import { ButtonContainer } from "./styles";

type ButtonType = {
  onPress: () => void;
  mode?: "default" | "outline";
  color?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export default function ({
  onPress,
  mode = "default",
  color = primary,
  loading,
  disabled,
  children,
}: ButtonType) {
  return (
    <ButtonContainer
      onPress={onPress}
      mode={mode}
      color={color}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={trueGray50} />
      ) : (
        <TextBoldSM>{children}</TextBoldSM>
      )}
    </ButtonContainer>
  );
}
