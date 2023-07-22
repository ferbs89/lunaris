import React, { useCallback, useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Icon, Text, useColorMode, useColorModeValue } from "native-base";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "./useAuth";

export default function useBottomSheetMenu() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const { toggleColorMode } = useColorMode();
  const { handleLogout } = useAuth();

  const colorMode = useColorModeValue("escuro", "claro");
  const bg = useColorModeValue("#fafaf9", "#1c1917");
  const bgMenuItem = useColorModeValue("warmGray.100", "warmGray.800");

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  function MenuItem({ title, icon, onPress }) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Box
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          marginX="2"
          marginBottom="2"
          p="4"
          borderRadius="md"
          bg={bgMenuItem}
        >
          <Text fontSize="md" fontWeight="500">
            {title}
          </Text>

          <Icon as={MaterialCommunityIcons} name={icon} size="lg" />
        </Box>
      </TouchableOpacity>
    );
  }

  function BottomSheetMenu() {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: bg,
        }}
      >
        <Box flex="1" alignItems="center" justifyContent="center">
          <Box w="100%">
            <MenuItem
              title="Alterar senha"
              icon="account-box"
              onPress={() => {}}
            />

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
          </Box>
        </Box>
      </BottomSheet>
    );
  }

  function openBottomSheetMenu() {
    bottomSheetRef.current.expand();
  }

  return {
    BottomSheetMenu,
    openBottomSheetMenu,
  };
}
