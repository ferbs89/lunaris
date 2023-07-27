import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack, Icon, Text, useColorModeValue } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MenuItemType = {
  title: string;
  icon: string;
  onPress: () => void;
};

export default function ({ title, icon, onPress }: MenuItemType) {
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
