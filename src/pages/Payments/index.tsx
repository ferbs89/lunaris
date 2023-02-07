import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Spinner,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import Container from "../../components/Container";
import Header from "../../components/Header";
import { supabase } from "../../config/supabase";

export default function Payments({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [groupValues, setGroupValues] = useState(["confirmed", "pending"]);

  const { isLoading, data, refetch } = useQuery("payments", fetchData);

  useFocusEffect(() => {
    refetch();
  });

  async function fetchData() {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .order("is_paid")
      .order("due")
      .order("description");

    const pending = data.filter((item) => !item.is_paid);
    const paid = data.filter((item) => item.is_paid).reverse();

    return [...pending, ...paid];
  }

  function renderItem(item) {
    return (
      <>
        <Pressable
          onPress={() =>
            navigation.navigate("PaymentForm", {
              item,
            })
          }
        >
          <Box p="4">
            <HStack justifyContent="space-between" mb="2">
              <Heading fontSize="md">{item.description}</Heading>
              <Heading fontSize="md">R$ {item.value}</Heading>
            </HStack>

            <HStack justifyContent="space-between">
              <Text fontSize="sm">{dayjs(item.due).format("DD/MM/YYYY")}</Text>
              <Badge
                rounded="full"
                colorScheme={item.is_paid ? "success" : "danger"}
              >
                {item.is_paid ? "Pago" : "Pendente"}
              </Badge>
            </HStack>
          </Box>
        </Pressable>

        <Divider />
      </>
    );
  }

  return (
    <Container>
      {isLoading ? (
        <Box flex="1" alignItems="center" justifyContent="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <>
          <Header
            navigation={navigation}
            title="Lista de pagamentos"
            leftIcon={
              <IconButton
                icon={<Icon as={MaterialIcons} name="search" />}
                size="lg"
                onPress={() => setShowFilter(true)}
              />
            }
          />

          {!showFilter ? (
            <>
              <FlatList
                data={data}
                renderItem={({ item }) => renderItem(item)}
                ListFooterComponent={() => <Box pt="24" />}
                onRefresh={refetch}
                refreshing={refreshing}
              />

              <Fab
                renderInPortal={false}
                icon={<Icon as={MaterialIcons} name="add" size="lg" />}
                onPress={() => navigation.navigate("PaymentForm")}
              />
            </>
          ) : (
            <Box p="4">
              <Checkbox value="confirmed" mb="4">
                Pago
              </Checkbox>

              <Checkbox value="pending" mb="4">
                Pendente
              </Checkbox>

              <Button
                mb="2"
                onPress={() => {
                  setShowFilter(false);
                }}
              >
                Filtrar
              </Button>

              <Button
                variant={"ghost"}
                onPress={() => {
                  setShowFilter(false);
                }}
              >
                Cancelar
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
