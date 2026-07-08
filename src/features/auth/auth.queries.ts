import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/core/query/query-keys"
import { getCurrentUser } from "@/features/auth/auth.api"

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => getCurrentUser(),
    staleTime: Number.POSITIVE_INFINITY, // session doesn't expire silently
    retry: false,                        // don't retry 401
  })
}
