import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";
import dayjs from "dayjs";

import { PaymentPayloadType } from "@/types/payments";

setupURLPolyfill();

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export async function selectPayments(date: string) {
  return await supabase
    .from("payments")
    .select("*")
    .gte("due", dayjs(date).startOf("month").format("YYYY-MM-DD"))
    .lte("due", dayjs(date).endOf("month").format("YYYY-MM-DD"))
    .order("due")
    .order("description");
}

export async function insertPayment(payload: PaymentPayloadType) {
  await supabase.from("payments").insert([payload]);
}

export async function updatePayment(id: string, payload: PaymentPayloadType) {
  await supabase.from("payments").update(payload).eq("id", id);
}

export async function deletePayment(id: string) {
  return await supabase.from("payments").delete().eq("id", id);
}
