import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import Container from "../components/Container";
import Loader from "../components/Loader";

import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Payments from "../pages/Payments";
import PaymentsForm from "../pages/PaymentsForm";

const Stack = createStackNavigator();

const NavigationContainerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function Routes() {
  const { user, loadingSession } = useAuth();

  if (loadingSession) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <NavigationContainer theme={NavigationContainerTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "transparentModal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Payments" component={Payments} />
            <Stack.Screen name="PaymentsForm" component={PaymentsForm} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
