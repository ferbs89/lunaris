import styled from "styled-components/native";

type TagContainerType = {
  color: string;
  width?: number;
};

export const TagContainer = styled.View<TagContainerType>`
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 4px 8px;
  background-color: ${({ color }) => color};

  ${({ width }) => width && `width: ${width}px;`}
`;
