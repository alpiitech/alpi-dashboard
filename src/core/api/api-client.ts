import { apiConfig } from "@/core/api/api-config"
import {
  ApiError,
  createApiError,
  createNetworkError,
  createUnknownError,
} from "@/core/api/api-error"
import type {
  ApiErrorCode,
  ApiErrorResponse,
  ApiMutationOptions,
  ApiQueryValue,
  ApiRequestOptions,
  ApiResponse,
} from "@/core/api/api-types"

function appendQuery(url: URL, query?: Record<string, ApiQueryValue>) {
  if (!query) {
    return
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return
    }

    url.searchParams.set(key, String(value))
  })
}

function statusToErrorCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHENTICATED"
  if (status === 403) return "FORBIDDEN"
  if (status === 404) return "NOT_FOUND"
  if (status === 409) return "CONFLICT"
  if (status === 413) return "FILE_TOO_LARGE"
  if (status === 415) return "FILE_TYPE_NOT_ALLOWED"
  if (status === 422) return "VALIDATION_ERROR"
  if (status === 429) return "RATE_LIMITED"
  if (status === 503) return "SERVICE_UNAVAILABLE"
  if (status >= 500) return "INTERNAL_ERROR"

  return "REQUEST_INVALID"
}

async function parseJsonSafely(response: Response) {
  const text = await response.text()

  if (!text) {
    return undefined
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw createUnknownError("The server returned an invalid response.")
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiErrorResponse).error === "object" &&
    (value as ApiErrorResponse).error !== null
  )
}

function normalizeSuccessResponse<TData>(value: unknown): ApiResponse<TData> {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value
  ) {
    const response = value as ApiResponse<TData>
    return {
      data: response.data,
      meta: response.meta ?? {},
    }
  }

  return {
    data: value as TData,
    meta: {},
  }
}

async function request<TData, TBody = unknown>(
  method: string,
  path: string,
  options: ApiMutationOptions<TBody> = {},
): Promise<ApiResponse<TData>> {
  const url = new URL(path.replace(/^\//, ""), `${apiConfig.baseUrl}/`)
  appendQuery(url, options.query)

  const headers = new Headers(options.headers)
  const hasBody = options.body !== undefined

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      signal: options.signal,
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 204) {
      return { data: undefined as TData, meta: {} }
    }

    const body = await parseJsonSafely(response)

    if (!response.ok) {
      if (isApiErrorResponse(body)) {
        throw new ApiError({
          ...body.error,
          code: body.error.code ?? statusToErrorCode(response.status),
          status: response.status,
        })
      }

      throw createApiError({
        code: statusToErrorCode(response.status),
        status: response.status,
      })
    }

    if (body === undefined) {
      return { data: undefined as TData, meta: {} }
    }

    return normalizeSuccessResponse<TData>(body)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw error
    }

    if (error instanceof TypeError) {
      throw createNetworkError()
    }

    throw createUnknownError(error instanceof Error ? error.message : undefined)
  }
}

export const apiClient = {
  get<TData>(path: string, options?: ApiRequestOptions) {
    return request<TData>("GET", path, options)
  },
  post<TData, TBody = unknown>(
    path: string,
    options?: ApiMutationOptions<TBody>,
  ) {
    return request<TData, TBody>("POST", path, options)
  },
  patch<TData, TBody = unknown>(
    path: string,
    options?: ApiMutationOptions<TBody>,
  ) {
    return request<TData, TBody>("PATCH", path, options)
  },
  put<TData, TBody = unknown>(
    path: string,
    options?: ApiMutationOptions<TBody>,
  ) {
    return request<TData, TBody>("PUT", path, options)
  },
  delete<TData = void>(path: string, options?: ApiRequestOptions) {
    return request<TData>("DELETE", path, options)
  },
}
