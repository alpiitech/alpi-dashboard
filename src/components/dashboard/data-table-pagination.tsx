import type { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/typography"

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30],
}: {
  table: Table<TData>
  pageSizeOptions?: number[]
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <Text as="div" className="text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount() || 1}
      </Text>
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          className="h-8 rounded-[var(--radius-input)] border border-border bg-surface px-2 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label="Rows per page"
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} rows
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          size="icon"
          className="sm:size-7"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="sm:size-7"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
