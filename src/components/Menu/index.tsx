import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Icon,
  MoonIcon,
  ScrollView,
  SunIcon,
  Text,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "../../hooks/useAuth";

export default function Menu({ navigation }) {
  const { handleLogout } = useAuth();
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("warmGray.50", "warmGray.800");
  const bg2 = useColorModeValue("warmGray.100", "warmGray.900");
  const iconTheme = useColorModeValue(
    <MoonIcon size="lg" />,
    <SunIcon size="lg" />
  );
  const theme = useColorModeValue("escuro", "claro");

  function MenuItem({ title, icon, onPress }) {
    return (
      <Button
        variant="ghost"
        leftIcon={icon}
        justifyContent="flex-start"
        onPress={onPress}
        p="4"
      >
        <Text fontSize="md" ml="2">
          {title}
        </Text>
      </Button>
    );
  }

  return (
    <Box flex="1" bg={bg} justifyContent="space-between">
      <Box flex="1">
        <ScrollView>
          <Heading px="4" py="6" bg={bg2}>
            Lunaris
          </Heading>

          <Divider />

          <MenuItem
            title="Pagamentos"
            icon={<Icon as={MaterialIcons} name="attach-money" size="lg" />}
            onPress={() => navigation.navigate("Payments")}
          />

          <Divider />

          <MenuItem
            title="Tarefas"
            icon={<Icon as={MaterialIcons} name="check" size="lg" />}
            onPress={() => navigation.navigate("Todos")}
          />

          <Divider />

          <MenuItem
            title={`Modo ${theme}`}
            icon={iconTheme}
            onPress={() => {
              toggleColorMode();
              navigation.closeDrawer();
            }}
          />
        </ScrollView>
      </Box>

      <Box bg={bg2}>
        <Divider />

        <MenuItem
          title="Sair"
          icon={<Icon as={MaterialIcons} name="exit-to-app" size="lg" />}
          onPress={async () => {
            await handleLogout();
            navigation.closeDrawer();
          }}
        />
      </Box>
    </Box>
  );
}
