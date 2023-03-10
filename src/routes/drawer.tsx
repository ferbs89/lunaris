import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Container from "../components/Container";
import Loader from "../components/Loader";
import Menu from "../components/Menu";

import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login";
import Payments from "../pages/Payments";
import PaymentsForm from "../pages/PaymentsForm";
import Todos from "../pages/Todos";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user, loadingSession } = useAuth();

  if (loadingSession) {
    return (
      <Container statusBarTheme="default">
        <Loader />
      </Container>
    );
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
            <Drawer.Screen name="PaymentsForm" component={PaymentsForm} />
            <Drawer.Screen name="Todos" component={Todos} />
          </>
        ) : (
          <Drawer.Screen name="Login" component={Login} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
