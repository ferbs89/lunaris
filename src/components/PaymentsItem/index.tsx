import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { danger600, success600 } from "../../config/colors";

import { PaymentItemType } from "../../types/paymentItem";

import Tag from "../Tag";

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
          <Text fontSize="md" fontWeight="500">
            {item.description}
          </Text>

          <Text fontSize="md" fontWeight="500">
            {formatNumber(item.value, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </Text>
        </PaymentsItemTitle>

        <PaymentsItemDescription>
          <Text>{dayjs(item.due).format("DD/MM/YYYY")}</Text>

          <Tag color={item.is_paid ? success600 : danger600} width={100}>
            <Text>{item.is_paid ? "Pago" : "Pendente"}</Text>
          </Tag>
        </PaymentsItemDescription>
      </PaymentsItemContainer>
    </TouchableOpacity>
  );
}
