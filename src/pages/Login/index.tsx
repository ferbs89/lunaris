import React from "react";
import { Box, Button, FormControl, Input, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";

import Container from "../../components/Container";
import { useAuth } from "../../hooks/useAuth";

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const { handleLogin, loadingLogin } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    reset,
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
      <Box flex="1" alignItems="center" justifyContent="center">
        <FormControl isRequired isInvalid={!!errors.login} px="4" mb="4">
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
                variant="underlined"
                size="xl"
              />
            )}
            name="login"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password} px="4" mb="4">
          <FormControl.Label>Senha </FormControl.Label>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                variant="underlined"
                size="xl"
              />
            )}
            name="password"
          />

          <FormControl.ErrorMessage>
            Campo obrigatório.
          </FormControl.ErrorMessage>
        </FormControl>

        <Box w="100%">
          <Button
            onPress={handleSubmit(async (data) => await onSubmit(data))}
            isLoading={loadingLogin}
            m="4"
            height="42"
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
