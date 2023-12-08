import React, { useRef, useState } from "react";
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { formatNumber } from "react-native-currency-input";
import dayjs from "dayjs";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import MenuItem from "../../components/MenuItem";
import MyBottomSheet from "../../components/MyBottomSheet";
import PaymentsSkeleton from "../../components/PaymentsSkeleton";
import PaymentsHeader from "../../components/PaymentsHeader";
import PaymentsItem from "../../components/PaymentsItem";

import { supabase } from "../../config/supabase";

import { useAuth } from "../../hooks/useAuth";
import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";

export default function Payments() {
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { handleLogout } = useAuth();
  const { toggleColorMode } = useColorMode();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const colorMode = useColorModeValue("escuro", "claro");

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

  function PaymentsListHeader() {
    return (
      <HStack justifyContent="space-between" mt="2" mx="4" mb="4" space="4">
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
        onPressMenu={() => bottomSheetRef.current.expand()}
        titleComponent={
          <PaymentsHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        }
        rightIcon={
          <IconButton
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
          renderItem={({ item }) => <PaymentsItem item={item} />}
          ListHeaderComponent={<PaymentsListHeader />}
        />
      )}

      <MyBottomSheet ref={bottomSheetRef}>
        <VStack flex="1" p="4" space="4">
          <MenuItem
            title="Alterar senha"
            icon="account-box"
            onPress={() => {}}
          />

          <MenuItem
            title={`Mudar para tema ${colorMode}`}
            icon="theme-light-dark"
            onPress={() => {
              toggleColorMode();
              bottomSheetRef.current.close();
            }}
          />

          <MenuItem
            title="Finalizar sessão"
            icon="exit-to-app"
            onPress={handleLogout}
          />
        </VStack>
      </MyBottomSheet>
    </Container>
  );
}
