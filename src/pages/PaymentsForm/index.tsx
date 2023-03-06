import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import ActionButton from "../../components/ActionButton";
import Container from "../../components/Container";
import Header from "../../components/Header";

import { supabase } from "../../config/supabase";

import { useAuth } from "../../hooks/useAuth";

type FormData = {
  description: string;
  value: string;
};

export default function PaymentsForm({ navigation, route }) {
  const { user } = useAuth();
  const toast = useToast();

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { params } = route;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  dayjs.extend(utc);

  useEffect(() => {
    if (params?.item) {
      reset({
        description: params.item.description,
        value: params.item.value.toString(),
      });

      setDatePickerValue(new Date(params.item.due));
      setIsPaid(!!params.item.is_paid);
    }

    return () => {
      resetFields();
    };
  }, [params]);

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
      is_paid: isPaid,
    };

    if (params?.item.id) {
      await supabase.from("payments").update(payload).eq("id", params.item.id);

      toast.show({
        description: "Pagamento editado com sucesso",
        placement: "top",
      });
    } else {
      await supabase.from("payments").insert([payload]);

      toast.show({
        description: "Novo pagamento adicionado",
        placement: "top",
      });
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
    setIsPaid(false);
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
        <FormControl isRequired isInvalid={!!errors.value} px="4" mt="4" mb="4">
          <FormControl.Label>Valor </FormControl.Label>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CurrencyInput
                value={Number(value)}
                onChangeValue={onChange}
                onBlur={onBlur}
                renderTextInput={(textInputProps) => (
                  <Input
                    {...textInputProps}
                    variant="underlined"
                    size="xl"
                    _input={{ fontWeight: "medium" }}
                  />
                )}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
              />
            )}
            name="value"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired px="4" mb="4">
          <FormControl.Label>Vencimento </FormControl.Label>

          <Input
            value={dayjs(datePickerValue).utc().format("DD/MM/YYYY")}
            onFocus={Keyboard.dismiss}
            onTouchStart={() => setDatePickerShow(true)}
            variant="underlined"
            size="xl"
            _input={{ fontWeight: "medium" }}
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

        <FormControl isRequired isInvalid={!!errors.description} px="4">
          <FormControl.Label>Descrição </FormControl.Label>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                size="xl"
                _input={{ fontWeight: "medium" }}
              />
            )}
            name="description"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <HStack justifyContent="space-between" space="2" p="4">
          <Button
            flex="1"
            rounded="full"
            colorScheme="danger"
            variant={!isPaid ? "solid" : "outline"}
            onPress={() => setIsPaid(false)}
          >
            Pendente
          </Button>

          <Button
            flex="1"
            rounded="full"
            colorScheme="success"
            size="sm"
            variant={isPaid ? "solid" : "outline"}
            onPress={() => setIsPaid(true)}
          >
            Pago
          </Button>
        </HStack>
      </ScrollView>

      <ActionButton
        title="Salvar"
        isLoading={isLoading}
        onPress={handleSubmit(async (data) => await onSubmit(data))}
      />
    </Container>
  );
}
