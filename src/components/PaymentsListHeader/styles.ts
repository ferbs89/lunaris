import styled from "styled-components/native";
import { warmGray800 } from "../../config/colors";

type PaymentsListHeaderItemType = {
  isSelected: boolean;
};

export const PaymentsListHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 8px 8px;
  gap: 8px;
`;

export const PaymentsListHeaderItem = styled.TouchableOpacity.attrs<PaymentsListHeaderItemType>(
  {
    activeOpacity: 0.5,
  }
)`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  background-color: ${warmGray800};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.3)};
`;

export const PaymentsListHeaderItemTitle = styled.View`
  align-items: center;
  margin-bottom: 8px;
`;
