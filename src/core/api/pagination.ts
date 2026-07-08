import type { ApiPaginationMeta } from "@/core/api/api-types"

export type PaginationQuery = {
  page: number
  pageSize: number
}

export type SortQuery = {
  sortBy?: string
  sortDirection?: "asc" | "desc"
}

export const defaultPagination: PaginationQuery = {
  page: 1,
  pageSize: 10,
}

export function normalizePagination(
  input: Partial<PaginationQuery>,
): PaginationQuery {
  const page = Number.isFinite(input.page) ? Number(input.page) : defaultPagination.page
  const pageSize = Number.isFinite(input.pageSize)
    ? Number(input.pageSize)
    : defaultPagination.pageSize

  return {
    page: Math.max(1, page),
    pageSize: Math.min(100, Math.max(1, pageSize)),
  }
}

export function toPaginationParams(pagination: PaginationQuery) {
  return {
    page: String(pagination.page),
    pageSize: String(pagination.pageSize),
  }
}

export function getPaginationLabel(meta?: ApiPaginationMeta) {
  if (!meta) {
    return "Page 1"
  }

  return `Page ${meta.page} of ${meta.totalPages || 1}`
}
