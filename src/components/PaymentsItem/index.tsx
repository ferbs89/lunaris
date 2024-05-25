import React from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import Tag from "@/components/Tag";
import { TextBoldSM, TextMD, TextXS } from "@/components/Text";

import { danger600, success600, trueGray300 } from "@/config/colors";

import { PaymentItemType } from "@/types/paymentItem";

import { formatCurrency } from "@/utils/currency";

import { PaymentsItemButton, PaymentsItemDescription } from "./styles";

type PaymentsItemType = {
  item: PaymentItemType;
};

export default function ({ item }: PaymentsItemType) {
  const navigation = useNavigation();

  return (
    <PaymentsItemButton
      onPress={() =>
        navigation.navigate("PaymentsForm", {
          item,
        })
      }
    >
      <TextXS color={trueGray300}>
        {dayjs(item.due).format("DD/MM/YYYY")}
      </TextXS>

      <PaymentsItemDescription>
        <TextMD>{item.description}</TextMD>

        <Tag color={item.is_paid ? success600 : danger600} width={100}>
          <TextBoldSM>{formatCurrency(item.value)}</TextBoldSM>
        </Tag>
      </PaymentsItemDescription>
    </PaymentsItemButton>
  );
}
