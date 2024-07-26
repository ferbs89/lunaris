import styled from "styled-components/native";
import { warmGray800 } from "@/config/colors";

export const PaymentButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin: 0 8px 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${warmGray800};
`;

export const PaymentContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PaymentDescription = styled.View`
  flex: 1;
`;

export const PaymentTag = styled.View`
  align-items: flex-end;
  justify-content: center;
`;
