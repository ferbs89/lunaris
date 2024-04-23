import styled from "styled-components/native";

type PaymentsFormStatusButtonType = {
  color: string;
  isSelected: boolean;
};

export const PaymentsFormContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  gap: 16px;
`;

export const PaymentsFormStatusContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
  gap: 8px;
`;

export const PaymentsFormStatusButtonContainer = styled.View`
  flex: 1;
`;

export const PaymentsFormStatusButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<PaymentsFormStatusButtonType>`
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 24px;

  ${({ isSelected, color }) =>
    isSelected
      ? `
    background-color: transparent;
    background-color: ${color};
  `
      : `
    border-width: 2px;
    border-color: ${color};
  `}
`;

export const PaymentsFormButtonContainer = styled.View`
  padding: 32px 16px 16px;
`;

export const PaymentsFormBottomSheetContainer = styled.View`
  flex: 1;
  padding: 16px;
  gap: 8px;
`;
