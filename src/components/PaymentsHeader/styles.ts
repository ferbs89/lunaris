import styled from "styled-components/native";
import { warmGray800 } from "@/config/colors";

export const PaymentsHeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 48px;
  margin: 0 8px;
  border-radius: 24px;
  background-color: ${warmGray800};
`;

export const PaymentsHeaderTitle = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
