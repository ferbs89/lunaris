import styled from "styled-components/native";

type TagContainerType = {
  color: string;
  width?: number;
};

export const TagContainer = styled.View<TagContainerType>`
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 16px;
  background-color: ${({ color }) => color};

  ${({ width }) => width && `width: ${width}px;`}
`;
