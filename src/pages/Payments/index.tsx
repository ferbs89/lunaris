import React, { useState } from "react";
import { Box, Fab, FlatList, Icon, IconButton, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import Container from "../../components/Container";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import PaymentsFilter from "../../components/PaymentsFilter";
import PaymentsHeader from "../../components/PaymentsHeader";
import PaymentsItem from "../../components/PaymentsItem";

import { supabase } from "../../config/supabase";

import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";

export default function Payments({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [status, setStatus] = useState<"pending" | "paid" | "all">("all");
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery(`payments-${currentDate}`, fetchData);

  useRefetchOnFocus(refetch);

  async function fetchData() {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .gte("due", dayjs(currentDate).startOf("month").format("YYYY-MM-DD"))
      .lte("due", dayjs(currentDate).endOf("month").format("YYYY-MM-DD"))
      .order("is_paid")
      .order("due")
      .order("description");

    return data;
  }

  function filterData() {
    if (!data) {
      return [];
    }

    let pendingList = [];
    let paidList = [];

    if (status === "pending" || status === "all") {
      pendingList = data.filter((item) => !item.is_paid);
    }

    if (status === "paid" || status === "all") {
      paidList = data.filter((item) => item.is_paid).reverse();
    }

    const filteredData = [...pendingList, ...paidList];

    if (search) {
      return filteredData.filter((item) =>
        item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredData;
  }

  const filteredData = filterData();

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
            icon={
              <Icon
                as={MaterialIcons}
                name={showFilter ? "search-off" : "search"}
              />
            }
            size="lg"
            onPress={() => setShowFilter((prevState) => !prevState)}
          />
        }
      />

      {!data && !filteredData.length ? (
        <Loader />
      ) : (
        <>
          {showFilter && (
            <PaymentsFilter
              status={status}
              search={search}
              setStatus={setStatus}
              setSearch={setSearch}
            />
          )}

          {!filteredData.length ? (
            <Box flex="1" alignItems="center" justifyContent="center">
              <Text>Nenhum pagamento encontrado.</Text>
            </Box>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <PaymentsItem item={item} navigation={navigation} />
              )}
              ListFooterComponent={() => <Box pt="24" />}
              onRefresh={refetch}
              refreshing={refreshing}
            />
          )}

          <Fab
            renderInPortal={false}
            icon={<Icon as={MaterialIcons} name="add" size="lg" />}
            onPress={() => navigation.navigate("PaymentsForm")}
          />
        </>
      )}
    </Container>
  );
}
