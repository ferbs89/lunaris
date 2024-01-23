import styled from "styled-components/native";
import { warmGray800 } from "../../config/colors";

export const MenuContainer = styled.View`
  flex: 1;
  padding: 16px;
  gap: 8px;
`;

export const MenuItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${warmGray800};
`;
