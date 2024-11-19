import React from "react";
import dayjs from "dayjs";

import IconButton from "@/components/IconButton";
import { TextLG, TextMD } from "@/components/Text";

import { usePaymentsStore } from "@/store/payments";

import { months } from "@/utils/months";

import {
  MonthButtonContainer,
  MonthButtonItem,
  MonthContainer,
  YearSelectorContainer,
  YearSelectorTitle,
} from "./styles";

type MonthYearPickerType = {
  onClose: () => void;
};

type MonthButtonType = {
  value: number;
  description: string;
};

export default function ({ onClose }: MonthYearPickerType) {
  const currentDate = usePaymentsStore((state) => state.currentDate);
  const setCurrentDate = usePaymentsStore((state) => state.setCurrentDate);

  function handleMonthSelect(value: number) {
    setCurrentDate(dayjs(currentDate).set("month", value).format("YYYY-MM-DD"));
    onClose();
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

  function MonthButton({ value, description }: MonthButtonType) {
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
    <>
      <YearSelector />

      <MonthContainer>
        {months.map((item, index) => (
          <MonthButton key={item} value={index} description={item} />
        ))}
      </MonthContainer>
    </>
  );
}
