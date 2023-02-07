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

import { useAuth } from "../../hooks/useAuth";

type FormData = {
  description: string;
  value: string;
};

export default function PaymentForm({ navigation, route }) {
  const { user } = useAuth();

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { params } = route;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (params?.item) {
      reset({
        description: params.item.description,
        value: params.item.value.toString(),
      });

      setDatePickerValue(new Date(params.item.due));
      setConfirmed(!!params.item.is_paid);
    }

    return () => {
      resetFields();
    };
  }, [params]);

  function renderItem(item: string) {
    return (
      <Box paddingX="4" paddingY="2">
        <Text fontSize="md">{item}</Text>
      </Box>
    );
  }

  function onChangeDatePicker(event: any, selectedDate: Date) {
    setDatePickerShow(false);
    setDatePickerValue(selectedDate);
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const payload = {
      user_id: user.id,
      description: data.description,
      value: data.value,
      due: datePickerValue,
      is_paid: confirmed,
    };

    if (params?.item.id) {
      await supabase.from("payments").update(payload).eq("id", params.item.id);
    } else {
      await supabase.from("payments").insert([payload]);
    }

    resetFields();
    navigation.navigate("Payments");
  }

  function resetFields() {
    reset({
      description: "",
      value: "",
    });

    setDatePickerValue(new Date());
    setConfirmed(false);
    setIsLoading(false);
  }

  return (
    <Container>
      <Header
        navigation={navigation}
        title={params?.item.id ? "Editar pagamento" : "Novo pagamento"}
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

        <Checkbox
          value="confirmed"
          isChecked={confirmed}
          onChange={() => setConfirmed((prevState) => !prevState)}
          m="4"
        >
          <Text>Pagamento realizado</Text>
        </Checkbox>
      </ScrollView>

      <ActionButton
        title="Salvar"
        isLoading={isLoading}
        onPress={handleSubmit(async (data) => await onSubmit(data))}
      />
    </Container>
  );
}
