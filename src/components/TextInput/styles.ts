import styled from "styled-components/native";
import { trueGray50, warmGray800 } from "@/config/colors";

export const TextInput = styled.TextInput`
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  border-radius: 8px;
  color: ${trueGray50};
  background-color: ${warmGray800};
`;
