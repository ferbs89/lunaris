import { ReactNode } from "react";

import { TextBoldSM, TextXS } from "@/components/Text";

import { error600, trueGray500 } from "@/config/colors";

import { FormControlContainer } from "./styles";

type FormControlType = {
  label: string;
  children: ReactNode;
  error?: boolean;
};

export default function ({ label, children, error }: FormControlType) {
  return (
    <FormControlContainer>
      <TextBoldSM color={trueGray500}>{label}</TextBoldSM>

      {children}

      {error && <TextXS color={error600}>Campo obrigatório</TextXS>}
    </FormControlContainer>
  );
}
