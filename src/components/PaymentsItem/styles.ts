import styled from "styled-components/native";
import { warmGray800 } from "../../config/colors";

export const PaymentsItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin: 0 8px 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${warmGray800};
`;

export const PaymentsItemTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PaymentsItemDescription = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;
