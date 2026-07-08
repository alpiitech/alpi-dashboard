import { z } from "zod"
import type { Booking } from "@/features/bookings/bookings.types"

export const bookingFormSchema = z
  .object({
    customerName: z.string().min(2, "Customer name must be at least 2 characters."),
    activityTitle: z.string().min(2, "Activity title must be at least 2 characters."),
    destination: z.string().min(2, "Destination must be at least 2 characters."),
    agentName: z.string().min(2, "Agent name must be at least 2 characters."),
    bookingDate: z.string().min(1, "Booking date is required."),
    travelDate: z.string().min(1, "Travel date is required."),
    status: z.enum([
      "pending_payment",
      "paid_upcoming",
      "ongoing",
      "finished",
      "cancelled",
      "expired",
    ]),
    paymentStatus: z.enum(["pending", "paid", "refunded"]),
    currency: z.enum(["IDR", "USD"]),
    totalAmount: z.number().positive("Total amount must be greater than 0."),
    internalNote: z.string().max(500, "Internal note must be 500 characters or fewer.").optional(),
  })
  .refine((data) => new Date(data.travelDate) >= new Date(data.bookingDate), {
    path: ["travelDate"],
    message: "Travel date must be after booking date.",
  })

export type BookingFormValues = z.infer<typeof bookingFormSchema>

export const emptyBookingFormValues: BookingFormValues = {
  customerName: "",
  activityTitle: "",
  destination: "",
  agentName: "",
  bookingDate: new Date().toISOString().slice(0, 10),
  travelDate: new Date().toISOString().slice(0, 10),
  status: "pending_payment",
  paymentStatus: "pending",
  currency: "IDR",
  totalAmount: 1,
  internalNote: "",
}

export function bookingToFormValues(booking: Booking): BookingFormValues {
  return {
    customerName: booking.customerName,
    activityTitle: booking.activityTitle,
    destination: booking.destination,
    agentName: booking.agentName,
    bookingDate: booking.bookingDate,
    travelDate: booking.travelDate,
    status: booking.status,
    paymentStatus: booking.paymentStatus === "failed" ? "pending" : booking.paymentStatus,
    currency: booking.currency,
    totalAmount: booking.totalAmount,
    internalNote: booking.internalNote ?? "",
  }
}

export function createBookingFromForm(values: BookingFormValues, code: string): Booking {
  return {
    id: `bk_${Date.now()}`,
    code,
    customerName: values.customerName,
    activityTitle: values.activityTitle,
    destination: values.destination,
    agentName: values.agentName,
    status: values.status,
    paymentStatus: values.paymentStatus,
    bookingDate: values.bookingDate,
    travelDate: values.travelDate,
    totalAmount: values.totalAmount,
    currency: values.currency,
    internalNote: values.internalNote?.trim() || undefined,
  }
}

export function updateBookingFromForm(booking: Booking, values: BookingFormValues): Booking {
  return {
    ...booking,
    customerName: values.customerName,
    activityTitle: values.activityTitle,
    destination: values.destination,
    agentName: values.agentName,
    status: values.status,
    paymentStatus: values.paymentStatus,
    bookingDate: values.bookingDate,
    travelDate: values.travelDate,
    totalAmount: values.totalAmount,
    currency: values.currency,
    internalNote: values.internalNote?.trim() || undefined,
  }
}
