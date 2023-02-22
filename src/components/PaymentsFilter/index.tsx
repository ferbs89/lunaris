import React from "react";
import { Keyboard } from "react-native";
import { Button, Divider, HStack, Icon, IconButton, Input } from "native-base";
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
  return (
    <>
      <HStack bg="warmGray.900" p="2" space="2" justifyContent="space-between">
        <Button
          flex="1"
          rounded="full"
          variant="subtle"
          colorScheme="danger"
          size="sm"
          leftIcon={
            status === "pending" && (
              <Icon as={MaterialIcons} name="check" size="md" />
            )
          }
          onPress={() => setStatus("pending")}
          _text={{
            fontSize: "sm",
            fontWeight: "bold",
          }}
        >
          Pendente
        </Button>

        <Button
          flex="1"
          rounded="full"
          variant="subtle"
          colorScheme="success"
          size="sm"
          leftIcon={
            status === "paid" && (
              <Icon as={MaterialIcons} name="check" size="md" />
            )
          }
          onPress={() => setStatus("paid")}
          _text={{
            fontSize: "sm",
            fontWeight: "bold",
          }}
        >
          Pago
        </Button>

        <Button
          flex="1"
          rounded="full"
          variant="subtle"
          colorScheme="blue"
          size="sm"
          leftIcon={
            status === "all" && (
              <Icon as={MaterialIcons} name="check" size="md" />
            )
          }
          onPress={() => setStatus("all")}
          _text={{
            fontSize: "sm",
            fontWeight: "bold",
          }}
        >
          Todos
        </Button>
      </HStack>

      <Divider />

      <HStack bg="warmGray.900" space="4" p="2">
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
            />
          }
        />
      </HStack>

      <Divider />
    </>
  );
}
