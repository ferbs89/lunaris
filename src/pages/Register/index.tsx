import React from "react";
import { Box, Button, FormControl, Input, ScrollView, Text } from "native-base";
import { Controller, useForm } from "react-hook-form";

import Container from "../../components/Container";
import Header from "../../components/Header";

type FormData = {
  email: string;
  password: string;
};

export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <Container>
      <Header onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Box flex="1" alignItems="center" justifyContent="center" px="4">
          <Text fontSize="lg" fontWeight="500">
            Criar nova conta
          </Text>

          <FormControl isRequired isInvalid={!!errors.email} mt="4">
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
                <Input
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
        </Box>

        <Box w="100%" p="4">
          <Button>Cadastrar</Button>
        </Box>
      </ScrollView>
    </Container>
  );
}
