import { TouchableOpacity } from "react-native";
import { Badge, Box, HStack, Text, useColorModeValue } from "native-base";
import { formatNumber } from "react-native-currency-input";

import { usePaymentsStore } from "../../store/payments";

export default function ({ totalNotPaid, totalPaid }) {
  const bg = useColorModeValue("warmGray.200", "warmGray.800");

  const status = usePaymentsStore((state) => state.status);
  const setStatus = usePaymentsStore((state) => state.setStatus);

  const isNotPaidSelected = status === "ALL" || status === "NOT_PAID";
  const isPaidSelected = status === "ALL" || status === "PAID";

  return (
    <HStack justifyContent="space-between" mx="2" mb="2" space="2">
      <Box
        flex="1"
        p="2"
        bg={bg}
        opacity={isNotPaidSelected ? 1 : 0.3}
        borderRadius="md"
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setStatus(status === "PAID" ? "ALL" : "NOT_PAID")}
        >
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pendente
          </Text>

          <Badge
            rounded="full"
            variant="solid"
            colorScheme="danger"
            _text={{
              fontSize: "md",
            }}
            height="8"
          >
            {formatNumber(totalNotPaid, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </Badge>
        </TouchableOpacity>
      </Box>

      <Box
        flex="1"
        p="2"
        bg={bg}
        opacity={isPaidSelected ? 1 : 0.3}
        borderRadius="md"
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setStatus(status === "NOT_PAID" ? "ALL" : "PAID")}
        >
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pago
          </Text>

          <Badge
            rounded="full"
            variant="solid"
            colorScheme="success"
            _text={{
              fontSize: "md",
            }}
            height="8"
          >
            {formatNumber(totalPaid, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </Badge>
        </TouchableOpacity>
      </Box>
    </HStack>
  );
}
