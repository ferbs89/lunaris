import React from "react";
import { Box, Divider, HStack, Skeleton, useColorModeValue } from "native-base";

export default function () {
  const bgButton = useColorModeValue("warmGray.50", "warmGray.800");

  function PaymentSkeleton() {
    return (
      <>
        <Box px="4" py="4" bgColor={bgButton}>
          <HStack justifyContent="space-between" mb="2">
            <Skeleton flex="0.75" h="6" rounded="sm" />
            <Skeleton w="20" h="6" rounded="sm" />
          </HStack>

          <HStack justifyContent="space-between">
            <Skeleton flex="0.5" h="5" rounded="sm" />
            <Skeleton w="20" h="6" rounded="full" />
          </HStack>
        </Box>

        <Divider />
      </>
    );
  }

  return (
    <>
      <PaymentSkeleton />
      <PaymentSkeleton />
      <PaymentSkeleton />
      <PaymentSkeleton />
      <PaymentSkeleton />
    </>
  );
}
