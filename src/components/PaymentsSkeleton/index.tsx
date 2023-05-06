import React from "react";
import { Box, Divider, HStack, Skeleton, useColorModeValue } from "native-base";

export default function () {
  const bg = useColorModeValue("warmGray.100", "warmGray.900");
  const bgButton = useColorModeValue("warmGray.50", "warmGray.800");

  function PaymentHeaderSkeleton() {
    return (
      <>
        <HStack bg={bg} justifyContent="space-between" p="4" space="4">
          <Box flex="1" alignItems="center">
            <Skeleton w="75%" h="6" rounded="sm" mb="2" />
            <Skeleton h="7" rounded="full" />
          </Box>

          <Box flex="1" alignItems="center">
            <Skeleton w="75%" h="6" rounded="sm" mb="2" />
            <Skeleton h="7" rounded="full" />
          </Box>
        </HStack>

        <Divider />
      </>
    );
  }

  function PaymentItemSkeleton() {
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
      <PaymentHeaderSkeleton />
      <PaymentItemSkeleton />
      <PaymentItemSkeleton />
      <PaymentItemSkeleton />
      <PaymentItemSkeleton />
    </>
  );
}
