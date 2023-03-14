import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Container from "../components/Container";
import Loader from "../components/Loader";
import Menu from "../components/Menu";

import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Payments from "../pages/Payments";
import PaymentsForm from "../pages/PaymentsForm";
import Todos from "../pages/Todos";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawerNavigator() {
  const { user, loadingSession } = useAuth();

  if (loadingSession) {
    return (
      <Container statusBarTheme="default">
        <Loader />
      </Container>
    );
  }

  function PaymentsStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "transparentModal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="PaymentsForm" component={PaymentsForm} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Drawer.Group>
            <Drawer.Screen name="PaymentsStack" component={PaymentsStack} />
            <Drawer.Screen name="Todos" component={Todos} />
          </Drawer.Group>
        ) : (
          <Drawer.Group>
            <Drawer.Screen name="Login" component={Login} />
          </Drawer.Group>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
