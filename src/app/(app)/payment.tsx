import React, { useState, useRef } from "react";
import { Keyboard } from "react-native";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";

import Button from "@/components/Button";
import Container from "@/components/Container";
import FormControl from "@/components/FormControl";
import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import MyBottomSheet from "@/components/MyBottomSheet";
import ScrollView from "@/components/ScrollView";
import { TextLG, TextMD } from "@/components/Text";
import TextInput from "@/components/TextInput";

import { danger600, success600 } from "@/config/colors";
import { supabase } from "@/config/supabase";

import { useAuth } from "@/hooks/useAuth";
import { usePaymentsStore } from "@/store/payments";

import {
  PaymentsFormBottomSheetContainer,
  PaymentsFormButtonContainer,
  PaymentsFormContainer,
  PaymentsFormStatusButton,
  PaymentsFormStatusButtonContainer,
  PaymentsFormStatusContainer,
} from "@/styles/payment";

type FormData = {
  description: string;
  value: string;
};

export default function Payment() {
  const { user } = useAuth();
  const payment = usePaymentsStore((state) => state.payment);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [datePickerValue, setDatePickerValue] = useState(
    payment?.due ? new Date(dayjs(payment.due).format()) : new Date()
  );
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [isPaid, setIsPaid] = useState(payment?.is_paid || false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: payment?.description || "",
      value: payment?.value.toString() || "",
    },
  });

  function onChangeDatePicker(event: DateTimePickerEvent, selectedDate: Date) {
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

    if (payment?.id) {
      await supabase.from("payments").update(payload).eq("id", payment?.id);
    } else {
      await supabase.from("payments").insert([payload]);
    }

    resetFields();
    router.back();
  }

  async function onDelete() {
    setIsLoading(true);

    await supabase.from("payments").delete().eq("id", payment?.id);

    resetFields();
    router.back();
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
        onBack={() => router.back()}
        rightIcon={
          payment?.id ? (
            <IconButton
              iconName="delete"
              onPress={() => bottomSheetRef.current?.expand()}
            />
          ) : null
        }
      />

      <ScrollView>
        <PaymentsFormContainer>
          <TextLG>{payment?.id ? "Editar pagamento" : "Novo pagamento"}</TextLG>

          <FormControl label="Valor" error={!!errors.value}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CurrencyInput
                  value={Number(value)}
                  onChangeValue={onChange}
                  onBlur={onBlur}
                  renderTextInput={(textInputProps) => (
                    <TextInput {...textInputProps} />
                  )}
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                />
              )}
              name="value"
            />
          </FormControl>

          <FormControl label="Vencimento">
            <TextInput
              value={dayjs(datePickerValue).format("DD/MM/YYYY")}
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
          </FormControl>

          <FormControl label="Descrição" error={!!errors.description}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="description"
            />
          </FormControl>

          <PaymentsFormStatusContainer>
            <PaymentsFormStatusButtonContainer>
              <PaymentsFormStatusButton
                color={danger600}
                isSelected={!isPaid}
                onPress={() => setIsPaid(false)}
              >
                <TextMD>Pendente</TextMD>
              </PaymentsFormStatusButton>
            </PaymentsFormStatusButtonContainer>

            <PaymentsFormStatusButtonContainer>
              <PaymentsFormStatusButton
                color={success600}
                isSelected={isPaid}
                onPress={() => setIsPaid(true)}
              >
                <TextMD>Pago</TextMD>
              </PaymentsFormStatusButton>
            </PaymentsFormStatusButtonContainer>
          </PaymentsFormStatusContainer>
        </PaymentsFormContainer>

        <PaymentsFormButtonContainer>
          <Button
            loading={isLoading}
            onPress={handleSubmit(async (data) => await onSubmit(data))}
          >
            Salvar
          </Button>
        </PaymentsFormButtonContainer>
      </ScrollView>

      <MyBottomSheet ref={bottomSheetRef}>
        <PaymentsFormBottomSheetContainer>
          <Button color={danger600} loading={isLoading} onPress={onDelete}>
            Confirmar exclusão
          </Button>

          <Button
            mode="outline"
            disabled={isLoading}
            onPress={() => bottomSheetRef.current?.close()}
          >
            Cancelar
          </Button>
        </PaymentsFormBottomSheetContainer>
      </MyBottomSheet>
    </Container>
  );
}
