import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import dayjs from "dayjs";

import MyBottomSheet from "../MyBottomSheet";

import { usePaymentsStore } from "../../store/payments";

import { months } from "../../utils/months";

const MonthYearPicker = forwardRef((_, ref) => {
  const currentDate = usePaymentsStore((state) => state.currentDate);
  const setCurrentDate = usePaymentsStore((state) => state.setCurrentDate);

  const bg = useColorModeValue("warmGray.200", "warmGray.800");
  const bgSelected = useColorModeValue("warmGray.300", "warmGray.700");

  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current.expand(),
    close: () => bottomSheetRef.current.close(),
  }));

  function handleMonthSelect(value: number) {
    setCurrentDate(dayjs(currentDate).set("month", value).format("YYYY-MM-DD"));
    bottomSheetRef.current.close();
  }

  function YearSelector() {
    const currentYear = dayjs(currentDate).year();

    return (
      <Box flex="1" flexDirection="row" bg={bg} rounded="full" m="4">
        <IconButton
          icon={<Icon as={MaterialIcons} name="chevron-left" size="lg" />}
          onPress={() =>
            setCurrentDate(
              dayjs(currentDate).subtract(1, "year").format("YYYY-MM-DD")
            )
          }
        />

        <Box flex="1" alignItems="center" justifyContent="center">
          <Text fontSize="lg" fontWeight="500" mx="1" isTruncated>
            {currentYear}
          </Text>
        </Box>

        <IconButton
          icon={<Icon as={MaterialIcons} name="chevron-right" size="lg" />}
          onPress={() =>
            setCurrentDate(
              dayjs(currentDate).add(1, "year").format("YYYY-MM-DD")
            )
          }
        />
      </Box>
    );
  }

  function MonthButton({ description, value }) {
    const currentMonth = dayjs(currentDate).month();

    return (
      <Box width="50%" px="1" pb="2">
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleMonthSelect(value)}
        >
          <Box
            alignItems="center"
            bg={currentMonth === value ? bgSelected : bg}
            p={4}
            rounded="md"
          >
            <Text fontSize="md" fontWeight="500">
              {description}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  }

  return (
    <MyBottomSheet ref={bottomSheetRef}>
      <YearSelector />

      <Flex flexDir="row" wrap="wrap" px="3" pb="2">
        {months.map((item, index) => (
          <MonthButton key={item} description={item} value={index} />
        ))}
      </Flex>
    </MyBottomSheet>
  );
});

export default MonthYearPicker;
