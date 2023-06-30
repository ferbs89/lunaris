import React, { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
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

export default function Payments({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { data, isLoading, refetch } = useQuery(
    `payments-${currentDate}`,
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

  function PaymentsListHeader() {
    const bg = useColorModeValue("warmGray.100", "warmGray.900");

    return (
      <>
        <HStack bg={bg} justifyContent="space-between" p="4" space="4">
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

        <Divider />
      </>
    );
  }

  return (
    <Container>
      <Header
        navigation={navigation}
        titleComponent={
          <PaymentsHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        }
        leftIcon={
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
    </Container>
  );
}
