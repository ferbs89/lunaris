import styled from "styled-components/native";
import { warmGray700, warmGray800 } from "../../config/colors";

type MonthButtonItemType = {
  isSelected: boolean;
};

export const YearSelectorContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 48px;
  margin: 16px;
  border-radius: 24px;
  background-color: ${warmGray800};
`;

export const YearSelectorTitle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MonthContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 12px 8px;
`;

export const MonthButtonContainer = styled.View`
  width: 50%;
  padding: 0 4px 8px;
`;

export const MonthButtonItem = styled.TouchableOpacity.attrs<MonthButtonItemType>(
  {
    activeOpacity: 0.5,
  }
)`
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? warmGray700 : warmGray800};
`;
