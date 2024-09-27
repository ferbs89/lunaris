import { create } from "zustand";
import dayjs from "dayjs";

import { PaymentItemType } from "@/types/payments";

type StatusType = "ALL" | "PAID" | "NOT_PAID";

type PaymentsStoreType = {
  currentDate: string;
  status: StatusType;
  payment: PaymentItemType | undefined;
  setCurrentDate: (currentDate: string) => void;
  setStatus: (status: StatusType) => void;
  setPayment: (payment: PaymentItemType | undefined) => void;
};

export const usePaymentsStore = create<PaymentsStoreType>()((set) => ({
  currentDate: dayjs().format("YYYY-MM-DD"),
  status: "ALL",
  payment: undefined,
  setCurrentDate: (currentDate) => set({ currentDate }),
  setStatus: (status) => set({ status }),
  setPayment: (payment) => set({ payment }),
}));
