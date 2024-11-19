import React, { useRef } from "react";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";

import IconButton from "@/components/IconButton";
import Tag from "@/components/Tag";
import { TextBoldSM, TextMD, TextXS } from "@/components/Text";

import { danger600, success600, trueGray300 } from "@/config/colors";
import { deletePayment, updatePayment } from "@/config/supabase";

import { usePaymentsStore } from "@/store/payments";

import { PaymentItemType } from "@/types/payments";

import { formatCurrency } from "@/utils/currency";

import {
  PaymentButton,
  PaymentContent,
  PaymentDescription,
  PaymentTag,
  SwipeableContent,
} from "./styles";

type ItemType = {
  item: PaymentItemType;
  refetch: () => void;
};

export default function ({ item, refetch }: ItemType) {
  const setPayment = usePaymentsStore((state) => state.setPayment);

  const swipeableRef = useRef<any>(null);

  function SwipeableLeft() {
    return (
      <SwipeableContent marginLeft={8}>
        <IconButton
          iconName="delete"
          onPress={async () => {
            await deletePayment(item.id).then(refetch);
          }}
        />
      </SwipeableContent>
    );
  }

  function SwipeableRight() {
    return (
      <SwipeableContent marginRight={8}>
        <IconButton
          iconName={item.is_paid ? "close" : "check"}
          color={item.is_paid ? danger600 : success600}
          onPress={async () => {
            await updatePayment(item.id, {
              is_paid: !item.is_paid,
            }).then(() => {
              refetch();
              swipeableRef.current?.close();
            });
          }}
        />
      </SwipeableContent>
    );
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={() => <SwipeableLeft />}
      renderRightActions={() => <SwipeableRight />}
    >
      <PaymentButton
        onPress={() => {
          setPayment(item);
          router.navigate("payment");
        }}
      >
        <PaymentContent>
          <PaymentDescription>
            <TextXS color={trueGray300}>
              {dayjs(item.due).format("DD/MM/YYYY")}
            </TextXS>

            <TextMD>{item.description}</TextMD>
          </PaymentDescription>

          <PaymentTag>
            <Tag color={item.is_paid ? success600 : danger600} width={100}>
              <TextBoldSM>{formatCurrency(item.value)}</TextBoldSM>
            </Tag>
          </PaymentTag>
        </PaymentContent>
      </PaymentButton>
    </Swipeable>
  );
}
