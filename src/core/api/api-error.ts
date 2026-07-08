import type { ApiErrorCode, ApiErrorPayload } from "@/core/api/api-types"

const defaultMessages: Record<ApiErrorCode, string> = {
  VALIDATION_ERROR: "Please review the highlighted fields.",
  UNAUTHENTICATED: "Your session could not be verified.",
  FORBIDDEN: "You do not have access to perform this action.",
  NOT_FOUND: "We could not find the requested information.",
  CONFLICT: "This request conflicts with the current state.",
  RATE_LIMITED: "Too many requests. Please try again later.",
  FILE_TOO_LARGE: "The selected file is too large.",
  FILE_TYPE_NOT_ALLOWED: "This file type is not allowed.",
  FILE_SCAN_PENDING: "The file is still being scanned.",
  FILE_REJECTED: "The file was rejected after scanning.",
  IMPORT_INVALID: "The import file contains invalid data.",
  IMPORT_FAILED: "The import could not be completed.",
  REQUEST_INVALID: "The request could not be processed.",
  INTERNAL_ERROR: "Something went wrong on the server.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable.",
  NETWORK_ERROR: "We could not reach the server. Check your connection and try again.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
}

export class ApiError extends Error {
  code: ApiErrorCode
  fieldErrors?: Record<string, string[]>
  requestId?: string
  status?: number

  constructor(payload: ApiErrorPayload) {
    super(payload.message || defaultMessages[payload.code] || defaultMessages.UNKNOWN_ERROR)
    this.name = "ApiError"
    this.code = payload.code
    this.fieldErrors = payload.fieldErrors
    this.requestId = payload.requestId
    this.status = payload.status
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function getApiErrorMessage(
  error: unknown,
  fallback = defaultMessages.UNKNOWN_ERROR,
) {
  if (isApiError(error)) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export function getFieldErrors(error: unknown) {
  return isApiError(error) ? error.fieldErrors : undefined
}

export function createApiError(payload: Partial<ApiErrorPayload> & {
  code: ApiErrorCode
}) {
  return new ApiError({
    message: payload.message ?? defaultMessages[payload.code],
    ...payload,
  })
}

export function createNetworkError() {
  return createApiError({ code: "NETWORK_ERROR" })
}

export function createUnknownError(message?: string) {
  return createApiError({
    code: "UNKNOWN_ERROR",
    message: message ?? defaultMessages.UNKNOWN_ERROR,
  })
}
