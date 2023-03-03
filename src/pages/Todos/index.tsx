import React, { useState } from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  HStack,
  Icon,
  Divider,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import Container from "../../components/Container";
import Header from "../../components/Header";

export default function Todos({ navigation }) {
  const instState = [
    {
      title: "Code",
      isCompleted: true,
    },
    {
      title: "Meeting with team at 9",
      isCompleted: false,
    },
    {
      title: "Check Emails",
      isCompleted: false,
    },
    {
      title: "Write an article",
      isCompleted: false,
    },
  ];

  const [list, setList] = useState(instState);
  const [inputValue, setInputValue] = useState("");

  const addItem = (title: string) => {
    if (title === "") {
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = (index: number) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index: number) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <Container>
      <Header navigation={navigation} title="Tarefas" />

      <ScrollView>
        <Box>
          <HStack space="4" p="4">
            <Input
              flex="1"
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Adicionar tarefa"
              size="md"
            />

            <IconButton
              variant="solid"
              icon={<Icon as={MaterialIcons} name="add" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </HStack>

          <Divider />

          {list.map((item, itemI) => (
            <Box key={item.title + itemI.toString()}>
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                p="4"
              >
                <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                  accessibilityLabel="Completar tarefa"
                />

                <Text
                  width="100%"
                  flexShrink="1"
                  textAlign="left"
                  fontSize="md"
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>

                <IconButton
                  colorScheme="danger"
                  icon={<Icon as={MaterialIcons} name="delete" />}
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>

              <Divider />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Container>
  );
}
