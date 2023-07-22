import React, { ReactNode } from "react";
import { HStack, Icon, IconButton, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderType = {
  title?: string;
  titleComponent?: ReactNode;
  rightIcon?: ReactNode;
  onBack?: () => void;
  onPressMenu?: () => void;
};

export default function Header({
  title,
  titleComponent,
  rightIcon,
  onBack,
  onPressMenu,
}: HeaderType) {
  return (
    <HStack p="1">
      <HStack flex="1" alignItems="center" justifyContent="space-between">
        {onBack ? (
          <IconButton
            rounded="full"
            icon={<Icon as={MaterialIcons} name="arrow-back" size="lg" />}
            onPress={onBack}
          />
        ) : (
          <IconButton
            rounded="full"
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
