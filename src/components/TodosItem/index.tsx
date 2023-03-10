import React from "react";
import {
  Box,
  Checkbox,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { supabase } from "../../config/supabase";

export default function ({ item, refetch }) {
  async function handleStatusChange() {
    await supabase
      .from("todos")
      .update({ is_complete: !item.is_complete })
      .eq("id", item.id);

    refetch();
  }

  async function handleDelete() {
    await supabase.from("todos").delete().eq("id", item.id);
    refetch();
  }

  return (
    <Box>
      <HStack w="100%" justifyContent="space-between" alignItems="center" p="4">
        <Checkbox
          isChecked={item.is_complete}
          onChange={handleStatusChange}
          value={item.task}
          accessibilityLabel="Completar tarefa"
        />

        <Text
          width="100%"
          flexShrink="1"
          textAlign="left"
          fontSize="md"
          mx="4"
          strikeThrough={item.is_complete}
          _light={{
            color: item.is_complete ? "gray.400" : "coolGray.800",
          }}
          _dark={{
            color: item.is_complete ? "gray.400" : "coolGray.50",
          }}
          onPress={handleStatusChange}
        >
          {item.task}
        </Text>

        <IconButton
          size="sm"
          variant="solid"
          colorScheme="danger"
          icon={<Icon as={MaterialIcons} name="delete" />}
          onPress={handleDelete}
        />
      </HStack>

      <Divider />
    </Box>
  );
}
