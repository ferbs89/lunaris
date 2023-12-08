import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useColorModeValue } from "native-base";

type BottomSheetType = {
  children: ReactNode;
};

const MyBottomSheet = forwardRef<BottomSheet, BottomSheetType>(
  ({ children }, ref) => {
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

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
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: bg,
        }}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default MyBottomSheet;
