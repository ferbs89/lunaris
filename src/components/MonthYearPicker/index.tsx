import React, { forwardRef, useImperativeHandle, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import dayjs from "dayjs";

import { usePaymentsStore } from "../../store/payments";

import { months } from "../../utils/months";

import IconButton from "../IconButton";
import MyBottomSheet from "../MyBottomSheet";
import { TextLG, TextMD } from "../Text";

import {
  MonthButtonContainer,
  MonthButtonItem,
  MonthContainer,
  YearSelectorContainer,
  YearSelectorTitle,
} from "./styles";

const MonthYearPicker = forwardRef((_, ref) => {
  const currentDate = usePaymentsStore((state) => state.currentDate);
  const setCurrentDate = usePaymentsStore((state) => state.setCurrentDate);

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
      <YearSelectorContainer>
        <IconButton
          iconName="chevron-left"
          onPress={() =>
            setCurrentDate(
              dayjs(currentDate).subtract(1, "year").format("YYYY-MM-DD")
            )
          }
        />

        <YearSelectorTitle>
          <TextLG>{currentYear}</TextLG>
        </YearSelectorTitle>

        <IconButton
          iconName="chevron-right"
          onPress={() =>
            setCurrentDate(
              dayjs(currentDate).add(1, "year").format("YYYY-MM-DD")
            )
          }
        />
      </YearSelectorContainer>
    );
  }

  function MonthButton({ description, value }) {
    const isSelected = dayjs(currentDate).month() === value;

    return (
      <MonthButtonContainer>
        <MonthButtonItem
          onPress={() => handleMonthSelect(value)}
          isSelected={isSelected}
        >
          <TextMD>{description}</TextMD>
        </MonthButtonItem>
      </MonthButtonContainer>
    );
  }

  return (
    <MyBottomSheet ref={bottomSheetRef}>
      <YearSelector />

      <MonthContainer>
        {months.map((item, index) => (
          <MonthButton key={item} description={item} value={index} />
        ))}
      </MonthContainer>
    </MyBottomSheet>
  );
});

export default MonthYearPicker;
