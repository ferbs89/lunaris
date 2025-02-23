import React, { ReactNode } from "react";

import IconButton from "@/components/IconButton";

import { HeaderContainer } from "./styles";

type HeaderType = {
  titleComponent?: ReactNode;
  rightIcon?: ReactNode;
  onBack?: () => void;
  onPressMenu?: () => void;
};

export default function ({
  titleComponent,
  rightIcon,
  onBack,
  onPressMenu,
}: HeaderType) {
  return (
    <HeaderContainer>
      {onBack ? (
        <IconButton iconName="arrow-back" onPress={onBack} />
      ) : (
        <IconButton iconName="menu" onPress={onPressMenu} />
      )}

      {titleComponent}

      {rightIcon}
    </HeaderContainer>
  );
}
