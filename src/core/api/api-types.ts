export type ApiPaginationMeta = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type ApiMeta = {
  requestId?: string
  pagination?: ApiPaginationMeta
}

export type ApiResponse<TData> = {
  data: TData
  meta: ApiMeta
}

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "FILE_TOO_LARGE"
  | "FILE_TYPE_NOT_ALLOWED"
  | "FILE_SCAN_PENDING"
  | "FILE_REJECTED"
  | "IMPORT_INVALID"
  | "IMPORT_FAILED"
  | "REQUEST_INVALID"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR"

export type ApiErrorPayload = {
  code: ApiErrorCode
  message: string
  fieldErrors?: Record<string, string[]>
  requestId?: string
  status?: number
}

export type ApiErrorResponse = {
  error: ApiErrorPayload
}

export type ApiQueryValue = string | number | boolean | null | undefined

export type ApiRequestOptions = {
  signal?: AbortSignal
  headers?: HeadersInit
  query?: Record<string, ApiQueryValue>
}

export type ApiMutationOptions<TBody> = ApiRequestOptions & {
  body?: TBody
}
