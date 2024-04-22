import styled from "styled-components/native";

type ButtonContainerType = {
  mode: "default" | "outline";
  color: string;
};

export const ButtonContainer = styled.TouchableOpacity.attrs<ButtonContainerType>(
  {
    activeOpacity: 0.5,
  }
)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 8px;

  ${({ mode, color }) =>
    mode == "default" &&
    `
    background-color: ${color};
  `}

  ${({ mode, color }) =>
    mode == "outline" &&
    `
    border: 1px solid ${color};
  `}
`;
