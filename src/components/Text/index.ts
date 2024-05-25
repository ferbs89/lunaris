import styled from "styled-components/native";
import { trueGray50 } from "@/config/colors";

type TextType = {
  color?: string;
};

export const TextXS = styled.Text<TextType>`
  font-family: "Poppins_400Regular";
  font-size: 12px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : trueGray50)};
`;

export const TextSM = styled.Text<TextType>`
  font-family: "Poppins_400Regular";
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => (color ? color : trueGray50)};
`;

export const TextBoldSM = styled.Text<TextType>`
  font-family: "Poppins_500Medium";
  font-size: 14px;
  line-height: 22px;
  color: ${({ color }) => (color ? color : trueGray50)};
`;

export const TextMD = styled.Text<TextType>`
  font-family: "Poppins_500Medium";
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : trueGray50)};
`;

export const TextLG = styled.Text<TextType>`
  font-family: "Poppins_500Medium";
  font-size: 18px;
  line-height: 26px;
  color: ${({ color }) => (color ? color : trueGray50)};
`;
