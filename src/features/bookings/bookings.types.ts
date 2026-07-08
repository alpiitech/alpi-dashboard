export type BookingStatus =
  | "pending_payment"
  | "paid_upcoming"
  | "ongoing"
  | "finished"
  | "cancelled"
  | "expired"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export type Booking = {
  id: string
  code: string
  customerName: string
  activityTitle: string
  destination: string
  agentName: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  bookingDate: string
  travelDate: string
  totalAmount: number
  currency: "IDR" | "USD"
  internalNote?: string
}
