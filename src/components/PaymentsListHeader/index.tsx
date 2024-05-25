import Tag from "@/components/Tag";
import { TextMD } from "@/components/Text";

import { danger600, success600 } from "@/config/colors";

import { usePaymentsStore } from "@/store/payments";

import { formatCurrency } from "@/utils/currency";

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
      <PaymentsListHeaderItem
        onPress={() => setStatus(status === "PAID" ? "ALL" : "NOT_PAID")}
        isSelected={isNotPaidSelected}
      >
        <PaymentsListHeaderItemTitle>
          <TextMD>Total pendente</TextMD>
        </PaymentsListHeaderItemTitle>

        <Tag color={danger600}>
          <TextMD>{formatCurrency(totalNotPaid)}</TextMD>
        </Tag>
      </PaymentsListHeaderItem>

      <PaymentsListHeaderItem
        onPress={() => setStatus(status === "NOT_PAID" ? "ALL" : "PAID")}
        isSelected={isPaidSelected}
      >
        <PaymentsListHeaderItemTitle>
          <TextMD>Total pago</TextMD>
        </PaymentsListHeaderItemTitle>

        <Tag color={success600}>
          <TextMD>{formatCurrency(totalPaid)}</TextMD>
        </Tag>
      </PaymentsListHeaderItem>
    </PaymentsListHeaderContainer>
  );
}
