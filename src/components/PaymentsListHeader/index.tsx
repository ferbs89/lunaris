import { Badge, Box, HStack, Text } from "native-base";
import { formatNumber } from "react-native-currency-input";

export default function ({ totalNotPaid, totalPaid }) {
  return (
    <HStack justifyContent="space-between" mt="2" mx="4" mb="4" space="4">
      <Box flex="1">
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
      </Box>

      <Box flex="1">
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
      </Box>
    </HStack>
  );
}
