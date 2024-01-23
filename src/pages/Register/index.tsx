import React from "react";
import { ScrollView } from "react-native";
import { Button, FormControl } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import { TextLG } from "../../components/Text";
import TextInput from "../../components/TextInput";

import { RegisterButtonContainer, RegisterFormContainer } from "./styles";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const navigation = useNavigation();

  return (
    <Container>
      <Header onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <RegisterFormContainer>
          <TextLG>Criar nova conta</TextLG>

          <FormControl isRequired isInvalid={!!errors.email} mt="4">
            <FormControl.Label>E-mail </FormControl.Label>

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

            <FormControl.ErrorMessage>
              Campo obrigatório.
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password} mt="4">
            <FormControl.Label>Senha </FormControl.Label>

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

            <FormControl.ErrorMessage>
              Campo obrigatório.
            </FormControl.ErrorMessage>
          </FormControl>
        </RegisterFormContainer>

        <RegisterButtonContainer>
          <Button>Cadastrar</Button>
        </RegisterButtonContainer>
      </ScrollView>
    </Container>
  );
}
