import React, { useState } from "react";
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";

import Container from "../../components/Container";
import Header from "../../components/Header";
import PaymentsSkeleton from "../../components/PaymentsSkeleton";
import PaymentsHeader from "../../components/PaymentsHeader";
import PaymentsItem from "../../components/PaymentsItem";

import { supabase } from "../../config/supabase";

import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";
import useBottomSheetMenu from "../../hooks/useBottomSheetMenu";

export default function Payments({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { data, isLoading, refetch } = useQuery(
    `payments-${dayjs(currentDate).month()}-${dayjs(currentDate).year()}`,
    fetchData
  );

  useRefetchOnFocus(refetch);
  const { BottomSheetMenu, openBottomSheetMenu } = useBottomSheetMenu();

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

  function PaymentsListHeader() {
    return (
      <HStack
        justifyContent="space-between"
        paddingTop="2"
        paddingX="4"
        paddingBottom="4"
        space="4"
      >
        <Box flex="1">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pendente
          </Text>

          <Badge
            rounded="full"
            variant="solid"
            colorScheme="danger"
            _text={{
              fontSize: "md",
            }}
            height="8"
          >
            {formatNumber(totalNotPaid, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </Badge>
        </Box>

        <Box flex="1">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pago
          </Text>

          <Badge
            rounded="full"
            variant="solid"
            colorScheme="success"
            _text={{
              fontSize: "md",
            }}
            height="8"
          >
            {formatNumber(totalPaid, {
              prefix: "R$ ",
              delimiter: ".",
              separator: ",",
              precision: 2,
            })}
          </Badge>
        </Box>
      </HStack>
    );
  }

  return (
    <Container>
      <Header
        onPressMenu={openBottomSheetMenu}
        titleComponent={
          <PaymentsHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        }
        rightIcon={
          <IconButton
            rounded="full"
            variant="ghost"
            icon={<Icon as={MaterialIcons} name="add" size="lg" />}
            onPress={() => navigation.navigate("PaymentsForm")}
          />
        }
      />

      {isLoading ? (
        <PaymentsSkeleton />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PaymentsItem item={item} navigation={navigation} />
          )}
          ListHeaderComponent={<PaymentsListHeader />}
          onRefresh={refetch}
          refreshing={refreshing}
        />
      )}

      <BottomSheetMenu />
    </Container>
  );
}
