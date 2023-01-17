import React, { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";

import Container from "../../components/Container";
import Header from "../../components/Header";
import { supabase } from "../../config/supabase";
import dayjs from "dayjs";

export default function Payments({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch } = useQuery(
    "payments",
    async () => {
      let { data: payments } = await supabase
        .from("payments")
        .select("*")
        .order("due", { ascending: false })
        .order("is_paid")
        .order("description");

      return payments;
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  function renderItem(item) {
    return (
      <>
        <Pressable
          onPress={() => navigation.navigate("PaymentForm", { id: item.id })}
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
                {item.is_paid ? "Confirmado" : "Pendente"}
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
      <Header navigation={navigation} title="Pagamentos" />

      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={() => <Box pt="16" />}
        onRefresh={refetch}
        refreshing={refreshing}
      />

      <Fab
        renderInPortal={false}
        icon={<Icon as={MaterialIcons} name="add" size="lg" />}
        size="lg"
        onPress={() => navigation.navigate("PaymentForm")}
      />
    </Container>
  );
}
