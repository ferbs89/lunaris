import React, { forwardRef, ReactNode, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useColorModeValue } from "native-base";

type BottomSheetType = {
  children: ReactNode;
};

const MyBottomSheet = forwardRef<BottomSheet, BottomSheetType>(
  ({ children }, ref) => {
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

    const bg = useColorModeValue("#fafaf9", "#1c1917");

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enableDynamicSizing={true}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: bg,
        }}
      >
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default MyBottomSheet;
