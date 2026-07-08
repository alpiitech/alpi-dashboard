import { toast } from "sonner"
import { getApiErrorMessage } from "@/core/api/api-error"

export type MutationToastCopy = {
  loading?: string
  success: string
  error?: string
}

export function getMutationErrorMessage(error: unknown, fallback: string) {
  return getApiErrorMessage(error, fallback)
}

export function createMutationCallbacks({
  successMessage,
  errorMessage,
  onSuccess,
}: {
  successMessage: string
  errorMessage: string
  onSuccess?: () => void
}) {
  return {
    onSuccess: () => {
      toast.success(successMessage)
      onSuccess?.()
    },
    onError: (error: unknown) => {
      toast.error(getMutationErrorMessage(error, errorMessage))
    },
  }
}
