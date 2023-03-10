import React from "react";
import { Badge, Box, Divider, HStack, Pressable, Text } from "native-base";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";

type PaymentItemType = {
  id: string;
  description: string;
  value: number;
  due: string;
  is_paid: boolean;
};

type PaymentsItemType = {
  navigation: any;
  item: PaymentItemType;
};

export default function ({ navigation, item }: PaymentsItemType) {
  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("PaymentsForm", {
            item,
          })
        }
      >
        <Box p="4">
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
      </Pressable>

      <Divider />
    </>
  );
}
