import React from "react";
import { TouchableOpacity } from "react-native";
import { Badge, Box, HStack, Text, useColorModeValue } from "native-base";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { PaymentItemType } from "../../types/paymentItem";

type PaymentsItemType = {
  item: PaymentItemType;
};

export default function ({ item }: PaymentsItemType) {
  const bg = useColorModeValue("warmGray.200", "warmGray.800");

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
      <Box marginX="2" marginBottom="2" p="2" bg={bg} borderRadius="md">
        <HStack justifyContent="space-between" mb="2">
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
        </HStack>

        <HStack justifyContent="space-between">
          <Text>{dayjs(item.due).format("DD/MM/YYYY")}</Text>

          <Badge
            rounded="full"
            variant="solid"
            colorScheme={item.is_paid ? "success" : "danger"}
            width="20"
          >
            {item.is_paid ? "Pago" : "Pendente"}
          </Badge>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
