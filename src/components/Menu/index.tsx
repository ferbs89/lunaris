import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { useColorMode, useColorModeValue } from "native-base";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { trueGray50 } from "../../config/colors";

import { useAuth } from "../../hooks/useAuth";

import MyBottomSheet from "../MyBottomSheet";
import { TextMD } from "../Text";

import { MenuContainer, MenuItemContainer } from "./styles";

type MenuItemType = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
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
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <MenuItemContainer>
          <TextMD>{title}</TextMD>
          <MaterialCommunityIcons name={icon} size={24} color={trueGray50} />
        </MenuItemContainer>
      </TouchableOpacity>
    );
  }

  return (
    <MyBottomSheet ref={bottomSheetRef}>
      <MenuContainer>
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
      </MenuContainer>
    </MyBottomSheet>
  );
});

export default Menu;
