import { TouchableOpacity } from "react-native";
import { formatNumber } from "react-native-currency-input";

import { danger600, success600 } from "../../config/colors";

import { usePaymentsStore } from "../../store/payments";

import Tag from "../Tag";
import { TextMD, TextSM } from "../Text";

import {
  PaymentsListHeaderContainer,
  PaymentsListHeaderItem,
  PaymentsListHeaderItemTitle,
} from "./styles";

export default function ({ totalNotPaid, totalPaid }) {
  const status = usePaymentsStore((state) => state.status);
  const setStatus = usePaymentsStore((state) => state.setStatus);

  const isNotPaidSelected = status === "ALL" || status === "NOT_PAID";
  const isPaidSelected = status === "ALL" || status === "PAID";

  return (
    <PaymentsListHeaderContainer>
      <PaymentsListHeaderItem isSelected={isNotPaidSelected}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setStatus(status === "PAID" ? "ALL" : "NOT_PAID")}
        >
          <PaymentsListHeaderItemTitle>
            <TextMD>Total pendente</TextMD>
          </PaymentsListHeaderItemTitle>

          <Tag color={danger600}>
            <TextSM>
              {formatNumber(totalNotPaid, {
                prefix: "R$ ",
                delimiter: ".",
                separator: ",",
                precision: 2,
              })}
            </TextSM>
          </Tag>
        </TouchableOpacity>
      </PaymentsListHeaderItem>

      <PaymentsListHeaderItem isSelected={isPaidSelected}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setStatus(status === "NOT_PAID" ? "ALL" : "PAID")}
        >
          <PaymentsListHeaderItemTitle>
            <TextMD>Total pago</TextMD>
          </PaymentsListHeaderItemTitle>

          <Tag color={success600}>
            <TextSM>
              {formatNumber(totalPaid, {
                prefix: "R$ ",
                delimiter: ".",
                separator: ",",
                precision: 2,
              })}
            </TextSM>
          </Tag>
        </TouchableOpacity>
      </PaymentsListHeaderItem>
    </PaymentsListHeaderContainer>
  );
}
