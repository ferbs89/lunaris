import { create } from "zustand";
import dayjs from "dayjs";

type PaymentsStoreType = {
  currentDate: string;
  setCurrentDate: (currentDate: string) => void;
};

export const usePaymentsStore = create<PaymentsStoreType>()((set) => ({
  currentDate: dayjs().format("YYYY-MM-DD"),
  setCurrentDate: (currentDate) => set({ currentDate }),
}));
