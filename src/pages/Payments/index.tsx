import React, { useRef } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Menu from "../../components/Menu";
import MonthYearPicker from "../../components/MonthYearPicker";
import PaymentsHeader from "../../components/PaymentsHeader";
import PaymentsItem from "../../components/PaymentsItem";
import PaymentsListFooter from "../../components/PaymentsListFooter";
import PaymentsListHeader from "../../components/PaymentsListHeader";

import { trueGray50 } from "../../config/colors";
import { supabase } from "../../config/supabase";

import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";

import { usePaymentsStore } from "../../store/payments";

import { LoaderContainer } from "./styles";

export default function Payments() {
  const navigation = useNavigation();

  const currentDate = usePaymentsStore((state) => state.currentDate);
  const status = usePaymentsStore((state) => state.status);

  const menuRef = useRef<BottomSheet>(null);
  const monthYearRef = useRef<BottomSheet>(null);

  const { data, isLoading, refetch } = useQuery(
    `payments-${dayjs(currentDate).month()}-${dayjs(currentDate).year()}`,
    fetchData
  );

  useRefetchOnFocus(refetch);

  async function fetchData() {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .gte("due", dayjs(currentDate).startOf("month").format("YYYY-MM-DD"))
      .lte("due", dayjs(currentDate).endOf("month").format("YYYY-MM-DD"))
      .order("due")
      .order("description");

    return data;
  }

  const totalNotPaid =
    data?.reduce(function (accumulator, item) {
      if (!item.is_paid) {
        return accumulator + item.value;
      } else {
        return accumulator + 0;
      }
    }, 0) || 0;

  const totalPaid =
    data?.reduce(function (accumulator, item) {
      if (item.is_paid) {
        return accumulator + item.value;
      } else {
        return accumulator + 0;
      }
    }, 0) || 0;

  const filterData = () => {
    switch (status) {
      case "NOT_PAID":
        return data?.filter((item) => !item.is_paid);

      case "PAID":
        return data?.filter((item) => item.is_paid);

      default:
        return data;
    }
  };

  return (
    <Container>
      <Header
        onPressMenu={() => menuRef.current.expand()}
        titleComponent={
          <PaymentsHeader onPress={() => monthYearRef.current.expand()} />
        }
        rightIcon={
          <IconButton
            iconName="add"
            onPress={() => navigation.navigate("PaymentsForm")}
          />
        }
      />

      {isLoading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color={trueGray50} />
        </LoaderContainer>
      ) : (
        <FlatList
          data={filterData()}
          renderItem={({ item }) => <PaymentsItem item={item} />}
          ListHeaderComponent={
            <PaymentsListHeader
              totalNotPaid={totalNotPaid}
              totalPaid={totalPaid}
            />
          }
          ListFooterComponent={<PaymentsListFooter />}
        />
      )}

      <Menu ref={menuRef} />
      <MonthYearPicker ref={monthYearRef} />
    </Container>
  );
}
