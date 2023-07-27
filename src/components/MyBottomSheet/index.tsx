import React, { ForwardedRef, forwardRef, ReactNode, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useColorModeValue } from "native-base";

type BottomSheetType = {
  snapPoints: string[];
  children: ReactNode;
};

const MyBottomSheet = forwardRef(function MyBottomSheet(
  { snapPoints, children }: BottomSheetType,
  ref: ForwardedRef<BottomSheet>
) {
  const bg = useColorModeValue("#fafaf9", "#1c1917");

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

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: bg,
      }}
    >
      {children}
    </BottomSheet>
  );
});

export default MyBottomSheet;
