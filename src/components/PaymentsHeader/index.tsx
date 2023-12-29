import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Icon, IconButton, Text, useColorModeValue } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

import { usePaymentsStore } from "../../store/payments";

import { months } from "../../utils/months";

export default function ({ onPress }) {
  const currentDate = usePaymentsStore((state) => state.currentDate);
  const setCurrentDate = usePaymentsStore((state) => state.setCurrentDate);

  const bg = useColorModeValue("warmGray.200", "warmGray.800");

  return (
    <Box flex="1" flexDirection="row" bg={bg} rounded="full" mx="2">
      <IconButton
        icon={<Icon as={MaterialIcons} name="chevron-left" size="lg" />}
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).subtract(1, "month").format("YYYY-MM-DD")
          )
        }
      />

      <Box flex="1" alignItems="center" justifyContent="center">
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text fontSize="lg" fontWeight="500" mx="1" isTruncated>
            {months[dayjs(currentDate).month()]}
          </Text>
        </TouchableOpacity>
      </Box>

      <IconButton
        icon={<Icon as={MaterialIcons} name="chevron-right" size="lg" />}
        onPress={() =>
          setCurrentDate(
            dayjs(currentDate).add(1, "month").format("YYYY-MM-DD")
          )
        }
      />
    </Box>
  );
}
