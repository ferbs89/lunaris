import React from "react";
import { TouchableOpacity } from "react-native";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { danger600, success600 } from "../../config/colors";

import { PaymentItemType } from "../../types/paymentItem";

import Tag from "../Tag";
import { TextMD, TextSM } from "../Text";

import {
  PaymentsItemContainer,
  PaymentsItemDescription,
  PaymentsItemTitle,
} from "./styles";

type PaymentsItemType = {
  item: PaymentItemType;
};

export default function ({ item }: PaymentsItemType) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("PaymentsForm", {
          item,
        })
      }
    >
      <PaymentsItemContainer>
        <PaymentsItemTitle>
          <TextMD>{item.description}</TextMD>

          <TextMD>
            {formatNumber(item.value, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </TextMD>
        </PaymentsItemTitle>

        <PaymentsItemDescription>
          <TextSM>{dayjs(item.due).format("DD/MM/YYYY")}</TextSM>

          <Tag color={item.is_paid ? success600 : danger600} width={100}>
            <TextSM>{item.is_paid ? "Pago" : "Pendente"}</TextSM>
          </Tag>
        </PaymentsItemDescription>
      </PaymentsItemContainer>
    </TouchableOpacity>
  );
}
