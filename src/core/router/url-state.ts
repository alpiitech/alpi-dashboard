import type { ApiQueryValue } from "@/core/api/api-types"

export function readStringParam(
  params: URLSearchParams,
  key: string,
  fallback = "",
) {
  return params.get(key) ?? fallback
}

export function readNumberParam(
  params: URLSearchParams,
  key: string,
  fallback: number,
) {
  const value = params.get(key)
  const parsed = value ? Number(value) : Number.NaN

  return Number.isFinite(parsed) ? parsed : fallback
}

export function writeSearchParams(
  current: URLSearchParams,
  updates: Record<string, ApiQueryValue>,
) {
  const next = new URLSearchParams(current)

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      next.delete(key)
      return
    }

    next.set(key, String(value))
  })

  return next
}
