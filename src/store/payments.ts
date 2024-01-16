import { create } from "zustand";
import dayjs from "dayjs";

type StatusType = "ALL" | "PAID" | "NOT_PAID";

type PaymentsStoreType = {
  currentDate: string;
  setCurrentDate: (currentDate: string) => void;
  status: StatusType;
  setStatus: (status: StatusType) => void;
};

export const usePaymentsStore = create<PaymentsStoreType>()((set) => ({
  currentDate: dayjs().format("YYYY-MM-DD"),
  setCurrentDate: (currentDate) => set({ currentDate }),
  status: "ALL",
  setStatus: (status) => set({ status }),
}));
