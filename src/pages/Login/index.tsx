import React, { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  ScrollView,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Container from "../../components/Container";

import { useAuth } from "../../hooks/useAuth";

const logo = require("../../assets/logo.png");

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const { handleLogin, loadingLogin } = useAuth();
  const navigation = useNavigation();
  const toast = useToast();

  const passwordInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const isLoginDone = await handleLogin(data.login.trim(), data.password);

    if (!isLoginDone) {
      if (!toast.isActive("login-toast")) {
        toast.show({
          id: "login-toast",
          description: "E-mail e/ou senha inválidos",
        });
      }
    }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Box flex="1" alignItems="center" justifyContent="center" px="4">
          <Image source={logo} alt="Lunaris" width={32} height={32} mb="8" />

          <FormControl isRequired isInvalid={!!errors.login}>
            <FormControl.Label>E-mail </FormControl.Label>

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={() => passwordInputRef.current.focus()}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
              )}
              name="login"
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
                <Input
                  ref={passwordInputRef}
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

            <FormControl.ErrorMessage>
              Campo obrigatório.
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>

        <Box w="100%" p="4">
          <Button
            onPress={handleSubmit(async (data) => await onSubmit(data))}
            isLoading={loadingLogin}
          >
            Entrar
          </Button>

          <Button
            variant="outline"
            onPress={() => navigation.navigate("Register")}
            mt="2"
          >
            Criar nova conta
          </Button>
        </Box>
      </ScrollView>
    </Container>
  );
}
