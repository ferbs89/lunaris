import styled from "styled-components/native";
import { primary600 } from "../../config/colors";

type ButtonContainerType = {
  color?: string;
};

export const ButtonContainer = styled.TouchableOpacity.attrs<ButtonContainerType>(
  {
    activeOpacity: 0.5,
  }
)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ color }) => (color ? color : primary600)};
`;
