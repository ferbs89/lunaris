import { PaymentItemType } from "./paymentItem";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Register: undefined;
      Payments: undefined;
      PaymentsForm: {
        item: PaymentItemType;
      };
    }
  }
}
