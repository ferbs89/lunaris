import React from "react";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";

import Button from "@/components/Button";
import Container from "@/components/Container";
import FormControl from "@/components/FormControl";
import ScrollView from "@/components/ScrollView";
import { TextLG } from "@/components/Text";
import TextInput from "@/components/TextInput";

import {
  RegisterButtonContainer,
  RegisterFormContainer,
} from "@/styles/register";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    console.log(data.email, data.password);
  }

  return (
    <Container>
      <ScrollView>
        <RegisterFormContainer>
          <TextLG>Criar nova conta</TextLG>

          <FormControl label="E-mail" error={!!errors.email}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="email"
            />
          </FormControl>

          <FormControl label="Senha" error={!!errors.password}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="password"
            />
          </FormControl>
        </RegisterFormContainer>

        <RegisterButtonContainer>
          <Button onPress={handleSubmit(async (data) => await onSubmit(data))}>
            Cadastrar
          </Button>

          <Button mode="outline" onPress={() => router.back()}>
            Cancelar
          </Button>
        </RegisterButtonContainer>
      </ScrollView>
    </Container>
  );
}
