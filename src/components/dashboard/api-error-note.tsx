import { isApiError } from "@/core/api/api-error"
import { Caption } from "@/components/ui/typography"

export function ApiErrorNote({ error }: { error: unknown }) {
  if (!isApiError(error) || !error.requestId) {
    return null
  }

  return (
    <Caption className="mt-3">
      Request ID: <span className="font-mono">{error.requestId}</span>
    </Caption>
  )
}
