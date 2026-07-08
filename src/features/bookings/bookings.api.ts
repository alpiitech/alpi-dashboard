import type { ApiResponse } from "@/core/api/api-types"
import { mockBookings } from "@/features/bookings/bookings.mock"
import type { Booking } from "@/features/bookings/bookings.types"

export function getInitialBookings(): Booking[] {
  return mockBookings.map((booking) => ({ ...booking }))
}

export function listBookings(): Promise<ApiResponse<Booking[]>> {
  return Promise.resolve({
    data: getInitialBookings(),
    meta: {
      requestId: "req_mock_bookings_0001",
    },
  })
}
