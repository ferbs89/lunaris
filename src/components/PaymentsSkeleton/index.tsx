import React from "react";
import { Box, HStack, Skeleton, Text, useColorModeValue } from "native-base";

export default function () {
  const bg = useColorModeValue("warmGray.200", "warmGray.800");
  const bgButton = useColorModeValue("warmGray.200", "warmGray.800");
  const startColor = useColorModeValue("warmGray.300", "muted.600");

  function PaymentHeaderSkeleton() {
    return (
      <HStack justifyContent="space-between" mx="2" mb="2" space="2">
        <Box flex="1" p="2" bg={bg} borderRadius="md">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pendente
          </Text>

          <Skeleton h="8" rounded="full" startColor={startColor} />
        </Box>

        <Box flex="1" p="2" bg={bg} borderRadius="md">
          <Text fontSize="md" fontWeight="500" textAlign="center" mb="2">
            Total pago
          </Text>

          <Skeleton h="8" rounded="full" startColor={startColor} />
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
          <Skeleton flex="0.75" h="6" rounded="sm" startColor={startColor} />
          <Skeleton w="20" h="6" rounded="sm" startColor={startColor} />
        </HStack>

        <HStack justifyContent="space-between">
          <Skeleton flex="0.5" h="5" rounded="sm" startColor={startColor} />
          <Skeleton w="20" h="6" rounded="full" startColor={startColor} />
        </HStack>
      </Box>
    );
  }

  return (
    <>
      <PaymentHeaderSkeleton />

      {[...Array(3)].map((_, index) => (
        <PaymentItemSkeleton key={index} />
      ))}
    </>
  );
}
