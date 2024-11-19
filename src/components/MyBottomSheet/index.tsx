import React, { forwardRef, ReactNode, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { warmGray900 } from "@/config/colors";

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

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: warmGray900 }}
        enablePanDownToClose
      >
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

export default MyBottomSheet;
