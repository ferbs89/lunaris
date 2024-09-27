import styled from "styled-components/native";

type IconButtonContainerType = {
  color: string;
};

export const IconButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<IconButtonContainerType>`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ color }) => color};
`;
