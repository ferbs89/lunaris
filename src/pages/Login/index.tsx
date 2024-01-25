import React from "react";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FormControl from "../../components/FormControl";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";

import { useAuth } from "../../hooks/useAuth";

import {
  LoginButtonContainer,
  LoginFormContainer,
  LoginLogoContainer,
} from "./styles";

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const { handleLogin, loadingLogin } = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const isLoginDone = await handleLogin(data.login.trim(), data.password);

    // if (!isLoginDone) {
    //   if (!toast.isActive("login-toast")) {
    //     toast.show({
    //       id: "login-toast",
    //       description: "E-mail e/ou senha inválidos",
    //     });
    //   }
    // }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <LoginFormContainer>
          <LoginLogoContainer>
            <Logo />
          </LoginLogoContainer>

          <FormControl label="E-mail" error={!!errors.login}>
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
              name="login"
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
                  onSubmitEditing={handleSubmit(
                    async (data) => await onSubmit(data)
                  )}
                  returnKeyType="send"
                />
              )}
              name="password"
            />
          </FormControl>
        </LoginFormContainer>

        <LoginButtonContainer>
          <Button
            onPress={handleSubmit(async (data) => await onSubmit(data))}
            // isLoading={loadingLogin}
          >
            Entrar
          </Button>

          <Button
            mode="outline"
            onPress={() => navigation.navigate("Register")}
          >
            Criar nova conta
          </Button>
        </LoginButtonContainer>
      </ScrollView>
    </Container>
  );
}
