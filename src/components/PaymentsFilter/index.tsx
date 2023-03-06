import React from "react";
import { Keyboard } from "react-native";
import {
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type PaymentStatusType = "pending" | "paid" | "all";

type PaymentsFilterType = {
  status: PaymentStatusType;
  search: string;
  setStatus: (value: PaymentStatusType) => void;
  setSearch: (value: string) => void;
};

export default function ({
  status,
  search,
  setStatus,
  setSearch,
}: PaymentsFilterType) {
  const bg = useColorModeValue("warmGray.100", "warmGray.900");

  return (
    <>
      <HStack bg={bg} p="2" space="2" justifyContent="space-between">
        <Button
          flex="1"
          rounded="full"
          colorScheme="danger"
          variant={status === "pending" ? "solid" : "outline"}
          onPress={() => setStatus("pending")}
        >
          Pendente
        </Button>

        <Button
          flex="1"
          rounded="full"
          colorScheme="success"
          variant={status === "paid" ? "solid" : "outline"}
          onPress={() => setStatus("paid")}
        >
          Pago
        </Button>

        <Button
          flex="1"
          rounded="full"
          variant={status === "all" ? "solid" : "outline"}
          onPress={() => setStatus("all")}
        >
          Todos
        </Button>
      </HStack>

      <Divider />

      <HStack bg={bg} space="4" p="2">
        <Input
          flex="1"
          placeholder="Pesquisar"
          size="md"
          onChangeText={setSearch}
          value={search}
          InputRightElement={
            <IconButton
              icon={<Icon as={MaterialIcons} name="close" />}
              onPress={() => {
                Keyboard.dismiss();
                setSearch("");
              }}
              mr="0.5"
            />
          }
        />
      </HStack>

      <Divider />
    </>
  );
}
