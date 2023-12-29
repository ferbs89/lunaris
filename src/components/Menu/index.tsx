import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TouchableOpacity } from "react-native";
import {
  HStack,
  Icon,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "native-base";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "../../hooks/useAuth";

import MyBottomSheet from "../MyBottomSheet";

type MenuItemType = {
  title: string;
  icon: string;
  onPress: () => void;
};

const Menu = forwardRef((_, ref) => {
  const { handleLogout } = useAuth();
  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue("escuro", "claro");

  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current.expand(),
    close: () => bottomSheetRef.current.close(),
  }));

  function MenuItem({ title, icon, onPress }: MenuItemType) {
    const bg = useColorModeValue("warmGray.200", "warmGray.800");

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          borderRadius="md"
          p="4"
          bg={bg}
        >
          <Text fontSize="md" fontWeight="500">
            {title}
          </Text>

          <Icon as={MaterialCommunityIcons} name={icon} size="lg" />
        </HStack>
      </TouchableOpacity>
    );
  }

  return (
    <MyBottomSheet ref={bottomSheetRef}>
      <VStack flex="1" p="4" space="2">
        <MenuItem title="Alterar senha" icon="account-box" onPress={() => {}} />

        <MenuItem
          title={`Mudar para tema ${colorMode}`}
          icon="theme-light-dark"
          onPress={() => {
            toggleColorMode();
            bottomSheetRef.current.close();
          }}
        />

        <MenuItem
          title="Finalizar sessão"
          icon="exit-to-app"
          onPress={handleLogout}
        />
      </VStack>
    </MyBottomSheet>
  );
});

export default Menu;
