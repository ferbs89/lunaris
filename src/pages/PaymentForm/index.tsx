import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import {
  Box,
  Checkbox,
  FormControl,
  Input,
  ScrollView,
  Text,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import ActionButton from "../../components/ActionButton";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { supabase } from "../../config/supabase";

type FormData = {
  description: string;
  value: string;
};

export default function PaymentForm({ navigation }) {
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  async function addPayment() {
    // await supabase.from("todos").insert([{ user_id: user.id, task: "teste" }]);
  }

  function renderItem(item: string) {
    return (
      <Box paddingX="4" paddingY="2">
        <Text fontSize="md">{item}</Text>
      </Box>
    );
  }

  const onChangeDatePicker = (event: any, selectedDate: Date) => {
    setDatePickerShow(false);
    setDatePickerValue(selectedDate);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    console.log(datePickerValue);
    console.log(confirmed);

    reset({
      description: "",
      value: "",
    });

    navigation.navigate("Payments");
  };

  return (
    <Container>
      <Header
        navigation={navigation}
        title="Pagamento"
        onBack={() => navigation.navigate("Payments")}
      />

      <ScrollView>
        <FormControl
          isRequired
          isInvalid={!!errors.description}
          px="4"
          mt="4"
          mb="2"
        >
          <FormControl.Label>Descrição </FormControl.Label>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                size="md"
              />
            )}
            name="description"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.value} px="4" mb="2">
          <FormControl.Label>Valor </FormControl.Label>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                size="md"
              />
            )}
            name="value"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired px="4" mb="2">
          <FormControl.Label>Vencimento </FormControl.Label>

          <Input
            value={dayjs(datePickerValue).format("DD/MM/YYYY")}
            onFocus={Keyboard.dismiss}
            onTouchStart={() => setDatePickerShow(true)}
            size="md"
          />

          {datePickerShow && (
            <DateTimePicker
              value={datePickerValue}
              mode="date"
              onChange={onChangeDatePicker}
            />
          )}

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <Checkbox value="two" m="4">
          <Text>Pagamento realizado</Text>
        </Checkbox>
      </ScrollView>

      <ActionButton title="Adicionar" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
