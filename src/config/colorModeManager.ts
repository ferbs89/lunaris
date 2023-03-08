import { StorageManager, ColorMode } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = (await AsyncStorage.getItem("@color-mode")) as
        | ColorMode
        | undefined;

      return val;
    } catch (e) {
      return undefined;
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {
      console.log(e);
    }
  },
};
