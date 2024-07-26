import React from "react";
import dayjs from "dayjs";
import { router } from "expo-router";

import Tag from "@/components/Tag";
import { TextBoldSM, TextMD, TextXS } from "@/components/Text";

import { danger600, success600, trueGray300 } from "@/config/colors";

import { PaymentItemType } from "@/types/paymentItem";

import { formatCurrency } from "@/utils/currency";

import {
  PaymentButton,
  PaymentContent,
  PaymentDescription,
  PaymentTag,
} from "./styles";
import { usePaymentsStore } from "@/store/payments";

type PaymentsItemType = {
  item: PaymentItemType;
};

export default function ({ item }: PaymentsItemType) {
  const setPayment = usePaymentsStore((state) => state.setPayment);

  return (
    <PaymentButton
      onPress={() => {
        setPayment(item);
        router.navigate("payment");
      }}
    >
      <PaymentContent>
        <PaymentDescription>
          <TextXS color={trueGray300}>
            {dayjs(item.due).format("DD/MM/YYYY")}
          </TextXS>

          <TextMD>{item.description}</TextMD>
        </PaymentDescription>

        <PaymentTag>
          <Tag color={item.is_paid ? success600 : danger600} width={100}>
            <TextBoldSM>{formatCurrency(item.value)}</TextBoldSM>
          </Tag>
        </PaymentTag>
      </PaymentContent>
    </PaymentButton>
  );
}
