import { format } from "date-fns"
import type { PartnerActivity } from "@/features/activities/activities.types"

export function formatActivityMoney(
  value: number,
  currency: PartnerActivity["currency"],
) {
  return new Intl.NumberFormat(currency === "IDR" ? "id-ID" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(value)
}

export function formatActivityDate(value: string) {
  return format(new Date(value), "dd/MM/yyyy")
}
