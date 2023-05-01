import React, { useState } from "react";
import { FlatList, Icon, IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
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
            onPress={() => {
              navigation.navigate("PaymentsForm");
            }}
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
          onRefresh={refetch}
          refreshing={refreshing}
        />
      )}
    </Container>
  );
}
