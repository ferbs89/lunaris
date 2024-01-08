import React, { useState, useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import MyBottomSheet from "../../components/MyBottomSheet";

import { supabase } from "../../config/supabase";

import { useAuth } from "../../hooks/useAuth";

type FormData = {
  description: string;
  value: string;
};

export default function PaymentsForm({ route }) {
  const { params } = route;

  const { user } = useAuth();
  const navigation = useNavigation();
  const toast = useToast();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      setDatePickerValue(new Date(dayjs(params.item.due).utc().format()));
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
    navigation.goBack();
  }

  async function onDelete() {
    setIsLoading(true);

    await supabase.from("payments").delete().eq("id", params.item.id);

    toast.show({
      description: "Pagamento excluído com sucesso",
      placement: "top",
    });

    resetFields();
    navigation.goBack();
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
        onBack={() => navigation.goBack()}
        rightIcon={
          params?.item ? (
            <IconButton
              icon={<Icon as={MaterialIcons} name="delete" size="lg" />}
              onPress={() => bottomSheetRef.current.expand()}
            />
          ) : null
        }
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Box flex="1" alignItems="center" justifyContent="center" px="4">
          <Text fontSize="lg" fontWeight="500">
            {params?.item.id ? "Editar pagamento" : "Novo pagamento"}
          </Text>

          <FormControl isRequired isInvalid={!!errors.value}>
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
                    <Input {...textInputProps} />
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

          <FormControl isRequired mt="4">
            <FormControl.Label>Vencimento </FormControl.Label>

            <Input
              value={dayjs(datePickerValue).utc().format("DD/MM/YYYY")}
              onFocus={Keyboard.dismiss}
              onTouchStart={() => setDatePickerShow(true)}
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

          <FormControl isRequired isInvalid={!!errors.description} mt="4">
            <FormControl.Label>Descrição </FormControl.Label>

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
              name="description"
            />

            <FormControl.ErrorMessage>
              Campo obrigatório.
            </FormControl.ErrorMessage>
          </FormControl>

          <HStack justifyContent="space-between" space="2" mt="6" mb="2">
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
        </Box>

        <Box w="100%" p="4">
          <Button
            isLoading={isLoading}
            onPress={handleSubmit(async (data) => await onSubmit(data))}
          >
            Salvar
          </Button>
        </Box>
      </ScrollView>

      <MyBottomSheet ref={bottomSheetRef}>
        <VStack flex="1" p="4" space="2">
          <Button colorScheme="danger" isLoading={isLoading} onPress={onDelete}>
            Confirmar exclusão
          </Button>

          <Button
            variant="outline"
            disabled={isLoading}
            onPress={() => bottomSheetRef.current.close()}
          >
            Cancelar
          </Button>
        </VStack>
      </MyBottomSheet>
    </Container>
  );
}
