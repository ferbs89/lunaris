import styled from "styled-components/native";
import { warmGray800 } from "../../config/colors";

export const IconButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${warmGray800};
`;
