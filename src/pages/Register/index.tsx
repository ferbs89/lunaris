import React from "react";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FormControl from "../../components/FormControl";
import { TextLG } from "../../components/Text";
import TextInput from "../../components/TextInput";

import { RegisterButtonContainer, RegisterFormContainer } from "./styles";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const navigation = useNavigation();

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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
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
          <Button
            onPress={handleSubmit(async (data) => await onSubmit(data))}
            // isLoading={loadingLogin}
          >
            Cadastrar
          </Button>

          <Button mode="outline" onPress={() => navigation.goBack()}>
            Cancelar
          </Button>
        </RegisterButtonContainer>
      </ScrollView>
    </Container>
  );
}
