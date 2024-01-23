import React from "react";
import dayjs from "dayjs";

import { usePaymentsStore } from "../../store/payments";

import { months } from "../../utils/months";

import IconButton from "../IconButton";
import { TextLG } from "../Text";

import { PaymentsHeaderContainer, PaymentsHeaderTitle } from "./styles";

export default function ({ onPress }) {
  const currentDate = usePaymentsStore((state) => state.currentDate);
  const setCurrentDate = usePaymentsStore((state) => state.setCurrentDate);

  return (
    <PaymentsHeaderContainer>
      <IconButton
        iconName="chevron-left"
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).subtract(1, "month").format("YYYY-MM-DD")
          )
        }
      />

      <PaymentsHeaderTitle onPress={onPress}>
        <TextLG>{months[dayjs(currentDate).month()]}</TextLG>
      </PaymentsHeaderTitle>

      <IconButton
        iconName="chevron-right"
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).add(1, "month").format("YYYY-MM-DD")
          )
        }
      />
    </PaymentsHeaderContainer>
  );
}
