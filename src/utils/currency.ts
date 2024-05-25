import { formatNumber } from "react-native-currency-input";

export function formatCurrency(value: number) {
  return formatNumber(value, {
    prefix: "R$ ",
    delimiter: ".",
    separator: ",",
    precision: 2,
  });
}
