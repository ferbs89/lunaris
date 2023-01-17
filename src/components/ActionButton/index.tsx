import React from "react";
import { Box, Button, Divider, useColorModeValue } from "native-base";

type ActionButtonType = {
  title: string;
  onPress: () => void;
};

export default function ActionButton({ title, onPress }: ActionButtonType) {
  const bg = useColorModeValue("warmGray.100", "warmGray.900");

  return (
    <>
      <Divider />

      <Box bg={bg}>
        <Button onPress={onPress} m="2">
          {title}
        </Button>
      </Box>
    </>
  );
}
