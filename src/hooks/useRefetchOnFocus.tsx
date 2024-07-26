import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";

export const useRefetchOnFocus = (refetch = () => {}, canRefetch = true) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  useFocusEffect(() => {
    setIsScreenFocused(true);
    return () => setIsScreenFocused(false);
  });

  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch();
    }
  }, [canRefetch, isScreenFocused, refetch]);
};
