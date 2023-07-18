import React from "react";
import { Box, Button, Divider } from "native-base";

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
  return (
    <>
      <Divider />

      <Box>
        <Button isLoading={isLoading} onPress={onPress} m="2" height="42">
          {title}
        </Button>
      </Box>
    </>
  );
}
