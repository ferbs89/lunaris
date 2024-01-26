import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FormControl from "../../components/FormControl";
import Logo from "../../components/Logo";
import { TextBoldSM } from "../../components/Text";
import TextInput from "../../components/TextInput";

import { error600 } from "../../config/colors";

import { useAuth } from "../../hooks/useAuth";

import {
  LoginButtonContainer,
  LoginFormContainer,
  LoginInvalidContainer,
  LoginLogoContainer,
} from "./styles";

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);

  const { handleLogin, loadingLogin } = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const isAuthenticated = await handleLogin(data.login.trim(), data.password);

    if (!isAuthenticated) {
      setIsLoginInvalid(true);
    }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <LoginFormContainer>
          <LoginLogoContainer>
            <Logo />
          </LoginLogoContainer>

          {isLoginInvalid && (
            <LoginInvalidContainer>
              <TextBoldSM color={error600}>
                E-mail e/ou senha inválidos
              </TextBoldSM>
            </LoginInvalidContainer>
          )}

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
                />
              )}
              name="password"
            />
          </FormControl>
        </LoginFormContainer>

        <LoginButtonContainer>
          <Button
            loading={loadingLogin}
            onPress={handleSubmit(async (data) => await onSubmit(data))}
          >
            Entrar
          </Button>

          <Button
            mode="outline"
            disabled={loadingLogin}
            onPress={() => navigation.navigate("Register")}
          >
            Criar nova conta
          </Button>
        </LoginButtonContainer>
      </ScrollView>
    </Container>
  );
}
