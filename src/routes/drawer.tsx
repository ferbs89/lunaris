import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Container from "../components/Container";
import Menu from "../components/Menu";

import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Payments from "../pages/Payments";
import PaymentForm from "../pages/PaymentForm";
import Todos from "../pages/Todos";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Container />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <>
            <Drawer.Screen name="Payments" component={Payments} />
            <Drawer.Screen name="PaymentForm" component={PaymentForm} />
            <Drawer.Screen name="Todos" component={Todos} />
          </>
        ) : (
          <Drawer.Screen name="Login" component={Login} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
