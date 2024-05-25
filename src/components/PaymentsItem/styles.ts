import styled from "styled-components/native";
import { warmGray800 } from "@/config/colors";

export const PaymentsItemButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin: 0 8px 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${warmGray800};
`;

export const PaymentsItemDescription = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
