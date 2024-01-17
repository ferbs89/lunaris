import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import dayjs from "dayjs";

import { usePaymentsStore } from "../../store/payments";

import { months } from "../../utils/months";

import IconButton from "../IconButton";

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

      <PaymentsHeaderTitle>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text fontSize="lg" fontWeight="500" mx="1" isTruncated>
            {months[dayjs(currentDate).month()]}
          </Text>
        </TouchableOpacity>
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
