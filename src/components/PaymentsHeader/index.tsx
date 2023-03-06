import React from "react";
import { Box, Icon, IconButton, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

type PaymentsHeaderType = {
  currentDate: string;
  setCurrentDate: (value: string) => void;
};

const monthList = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function ({ currentDate, setCurrentDate }: PaymentsHeaderType) {
  return (
    <Box flex="1" flexDirection="row">
      <IconButton
        icon={<Icon as={MaterialIcons} name="chevron-left" />}
        size="lg"
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).subtract(1, "month").format("YYYY-MM-DD")
          )
        }
      />

      <Box flex="1" alignItems="center" justifyContent="center">
        <Text fontSize="lg" fontWeight="500" mx="2" isTruncated>
          {monthList[dayjs(currentDate).month()]}
        </Text>
      </Box>

      <IconButton
        icon={<Icon as={MaterialIcons} name="chevron-right" />}
        size="lg"
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).add(1, "month").format("YYYY-MM-DD")
          )
        }
      />
    </Box>
  );
}
