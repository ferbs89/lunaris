import React from "react";
import { Box, Button, Divider, useColorModeValue } from "native-base";

type ActionButtonType = {
  title: string;
  isLoading: boolean;
  onPress: () => void;
};

export default function ActionButton({
  title,
  isLoading,
  onPress,
}: ActionButtonType) {
  const bg = useColorModeValue("warmGray.100", "warmGray.900");

  return (
    <>
      <Divider />

      <Box bg={bg}>
        <Button isLoading={isLoading} onPress={onPress} m="2" height="42">
          {title}
        </Button>
      </Box>
    </>
  );
}
