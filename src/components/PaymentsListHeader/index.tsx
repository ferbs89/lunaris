import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { formatNumber } from "react-native-currency-input";

import { danger600, success600 } from "../../config/colors";

import { usePaymentsStore } from "../../store/payments";

import Tag from "../Tag";

import { PaymentsListHeaderContainer, PaymentsListHeaderItem } from "./styles";

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
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pendente
          </Text>

          <Tag color={danger600}>
            <Text>
              {formatNumber(totalNotPaid, {
                prefix: "R$ ",
                delimiter: ".",
                separator: ",",
                precision: 2,
              })}
            </Text>
          </Tag>
        </TouchableOpacity>
      </PaymentsListHeaderItem>

      <PaymentsListHeaderItem isSelected={isPaidSelected}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setStatus(status === "NOT_PAID" ? "ALL" : "PAID")}
        >
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pago
          </Text>

          <Tag color={success600}>
            <Text>
              {formatNumber(totalPaid, {
                prefix: "R$ ",
                delimiter: ".",
                separator: ",",
                precision: 2,
              })}
            </Text>
          </Tag>
        </TouchableOpacity>
      </PaymentsListHeaderItem>
    </PaymentsListHeaderContainer>
  );
}
