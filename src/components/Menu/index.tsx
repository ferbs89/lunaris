import React, { forwardRef, useImperativeHandle, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MyBottomSheet from "@/components/MyBottomSheet";
import { TextMD } from "@/components/Text";

import { trueGray50 } from "@/config/colors";

import { useAuth } from "@/hooks/useAuth";

import { MenuContainer, MenuItemContainer } from "./styles";

type MenuItemType = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

const Menu = forwardRef((_, ref) => {
  const { handleLogout } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  function MenuItem({ title, icon, onPress }: MenuItemType) {
    return (
      <MenuItemContainer onPress={onPress}>
        <TextMD>{title}</TextMD>
        <MaterialCommunityIcons name={icon} size={24} color={trueGray50} />
      </MenuItemContainer>
    );
  }

  return (
    <MyBottomSheet ref={bottomSheetRef}>
      <MenuContainer>
        <MenuItem title="Alterar senha" icon="account-box" onPress={() => {}} />

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
