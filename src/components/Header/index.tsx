import React, { ReactNode } from "react";
import { HStack, Icon, IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderType = {
  titleComponent?: ReactNode;
  rightIcon?: ReactNode;
  onBack?: () => void;
  onPressMenu?: () => void;
};

export default function Header({
  titleComponent,
  rightIcon,
  onBack,
  onPressMenu,
}: HeaderType) {
  return (
    <HStack p="4">
      <HStack flex="1" alignItems="center" justifyContent="space-between">
        {onBack ? (
          <IconButton
            icon={<Icon as={MaterialIcons} name="arrow-back" size="lg" />}
            onPress={onBack}
          />
        ) : (
          <IconButton
            icon={<Icon as={MaterialIcons} name="menu" size="lg" />}
            onPress={onPressMenu}
          />
        )}

        {titleComponent}

        {rightIcon}
      </HStack>
    </HStack>
  );
}
