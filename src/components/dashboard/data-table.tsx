import { useState, type ReactNode } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DataTablePagination } from "@/components/dashboard/data-table-pagination"
import { EmptyState } from "@/components/dashboard/empty-state"
import { ErrorState } from "@/components/dashboard/error-state"
import { LoadingState } from "@/components/dashboard/loading-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/shared/utils/cn"

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  isError?: boolean
  emptyState?: ReactNode
  errorState?: ReactNode
  onRowClick?: (row: TData) => void
  getRowId?: (row: TData) => string
  enablePagination?: boolean
  pageSizeOptions?: number[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isError = false,
  emptyState,
  errorState,
  onRowClick,
  getRowId,
  enablePagination = true,
  pageSizeOptions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  // TanStack Table intentionally returns callable table APIs that React Compiler cannot memoize safely.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getRowId,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (isLoading) {
    return (
      <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
        <LoadingState variant="table" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
        {errorState ?? <ErrorState />}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
        {emptyState ?? (
          <EmptyState
            title="No records yet."
            description="Records will appear here once available."
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
      <Table className="min-w-max">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                return (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          canSort &&
                            "cursor-pointer rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20",
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort ? <ArrowUpDown className="size-3.5" /> : null}
                      </button>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {enablePagination ? (
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      ) : null}
    </div>
  )
}
