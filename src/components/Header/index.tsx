import React, { ReactNode } from "react";
import {
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderType = {
  navigation: any;
  title?: string;
  leftIcon?: ReactNode;
  onBack?: () => void;
};

export default function Header({
  navigation,
  title,
  leftIcon,
  onBack,
}: HeaderType) {
  const bgHeader = useColorModeValue("warmGray.100", "warmGray.900");

  return (
    <>
      <HStack
        bg={bgHeader}
        px="2"
        py="1"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack flex="1" alignItems="center">
          {onBack ? (
            <IconButton
              icon={<Icon as={MaterialIcons} name="arrow-back" />}
              size="lg"
              onPress={onBack}
            />
          ) : (
            <IconButton
              icon={<Icon as={MaterialIcons} name="menu" />}
              size="lg"
              onPress={() => navigation.openDrawer()}
            />
          )}

          <Heading flex="1" size="md" mx="2" isTruncated>
            {title}
          </Heading>

          {leftIcon}
        </HStack>
      </HStack>

      <Divider />
    </>
  );
}
