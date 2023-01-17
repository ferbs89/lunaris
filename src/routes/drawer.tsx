import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Menu from "../components/Menu";
import Home from "../pages/Home";
import Payments from "../pages/Payments";
import PaymentForm from "../pages/PaymentForm";
import Todos from "../pages/Todos";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Payments" component={Payments} />
        <Drawer.Screen name="PaymentForm" component={PaymentForm} />
        <Drawer.Screen name="Todos" component={Todos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
