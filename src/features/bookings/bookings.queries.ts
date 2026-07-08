import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/core/query/query-keys"
import { getInitialBookings, listBookings } from "@/features/bookings/bookings.api"

export function useBookingsQuery() {
  return useQuery({
    queryKey: queryKeys.bookings.list(),
    queryFn: () => listBookings(),
    initialData: {
      data: getInitialBookings(),
      meta: {
        requestId: "req_mock_bookings_initial",
      },
    },
  })
}
