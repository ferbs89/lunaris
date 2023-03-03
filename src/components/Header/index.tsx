import React, { ReactNode } from "react";
import {
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
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
  const bg = useColorModeValue("warmGray.100", "warmGray.900");

  return (
    <>
      <HStack bg={bg} py="1">
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

          <Text flex="1" fontSize="lg" fontWeight="500" mx="2" isTruncated>
            {title}
          </Text>

          {leftIcon}
        </HStack>
      </HStack>

      <Divider />
    </>
  );
}
