export type PaymentItemType = {
  id: string;
  description: string;
  value: number;
  due: string;
  is_paid: boolean;
};

export type PaymentPayloadType = {
  user_id?: string;
  description?: string;
  value?: string;
  due?: Date;
  is_paid?: boolean;
};
