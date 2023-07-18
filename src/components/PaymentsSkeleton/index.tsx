import React from "react";
import { Box, HStack, Skeleton, Text, useColorModeValue } from "native-base";

export default function () {
  const bgButton = useColorModeValue("warmGray.100", "warmGray.800");

  function PaymentHeaderSkeleton() {
    return (
      <HStack
        justifyContent="space-between"
        paddingTop="2"
        paddingX="4"
        paddingBottom="4"
        space="4"
      >
        <Box flex="1">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pendente
          </Text>

          <Skeleton h="8" rounded="full" />
        </Box>

        <Box flex="1">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pago
          </Text>

          <Skeleton h="8" rounded="full" />
        </Box>
      </HStack>
    );
  }

  function PaymentItemSkeleton() {
    return (
      <Box
        marginX="2"
        marginBottom="2"
        p="2"
        bgColor={bgButton}
        borderRadius="md"
      >
        <HStack justifyContent="space-between" mb="2">
          <Skeleton flex="0.75" h="6" rounded="sm" />
          <Skeleton w="20" h="6" rounded="sm" />
        </HStack>

        <HStack justifyContent="space-between">
          <Skeleton flex="0.5" h="5" rounded="sm" />
          <Skeleton w="20" h="6" rounded="full" />
        </HStack>
      </Box>
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
