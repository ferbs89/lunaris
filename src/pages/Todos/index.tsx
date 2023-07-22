import React, { useState } from "react";
import { Keyboard } from "react-native";
import {
  Input,
  IconButton,
  HStack,
  Icon,
  Divider,
  useColorModeValue,
  FlatList,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import TodosItem from "../../components/TodosItem";

import { supabase } from "../../config/supabase";

import { useAuth } from "../../hooks/useAuth";
import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";

export default function Todos({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [task, setTask] = useState("");

  const bg = useColorModeValue("warmGray.100", "warmGray.900");
  const { user } = useAuth();
  const { data, refetch } = useQuery("todos", fetchData);

  useRefetchOnFocus(refetch);

  async function fetchData() {
    const { data } = await supabase.from("todos").select("*").order("id");
    return data;
  }

  async function addTodo() {
    if (task === "") {
      return;
    }

    await supabase.from("todos").insert([
      {
        user_id: user.id,
        task,
      },
    ]);

    refetch();
    setTask("");
    Keyboard.dismiss();
  }

  return (
    <Container>
      <Header />

      {!data ? (
        <Loader />
      ) : (
        <>
          <HStack bg={bg} p="2">
            <Input
              flex="1"
              placeholder="Nova tarefa"
              size="md"
              onChangeText={setTask}
              value={task}
              onSubmitEditing={addTodo}
              returnKeyType="send"
              variant="underlined"
              InputRightElement={
                <IconButton
                  icon={<Icon as={MaterialIcons} name="close" />}
                  onPress={() => {
                    Keyboard.dismiss();
                    setTask("");
                  }}
                />
              }
            />
          </HStack>

          <Divider />

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TodosItem item={item} refetch={refetch} />
            )}
            onRefresh={refetch}
            refreshing={refreshing}
          />
        </>
      )}
    </Container>
  );
}
