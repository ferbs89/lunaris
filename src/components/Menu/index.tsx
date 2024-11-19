import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TextMD } from "@/components/Text";

import { trueGray50 } from "@/config/colors";

import { useAuth } from "@/hooks/useAuth";

import { MenuContainer, MenuItemContainer } from "./styles";

type MenuItemType = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function () {
  const { handleLogout } = useAuth();

  function MenuItem({ title, icon, onPress }: MenuItemType) {
    return (
      <MenuItemContainer onPress={onPress}>
        <TextMD>{title}</TextMD>
        <MaterialCommunityIcons name={icon} size={24} color={trueGray50} />
      </MenuItemContainer>
    );
  }

  return (
    <MenuContainer>
      <MenuItem title="Alterar senha" icon="account-box" onPress={() => {}} />

      <MenuItem
        title="Finalizar sessão"
        icon="exit-to-app"
        onPress={handleLogout}
      />
    </MenuContainer>
  );
}
