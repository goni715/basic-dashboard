"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalEntries: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  itemName?: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: DataTablePaginationProps;
  emptyState?: React.ReactNode;
  minWidth?: string;
  className?: string;
  tableClassName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  emptyState,
  minWidth = "min-w-[850px]",
  className,
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const totalEntries = pagination?.totalEntries ?? data.length;
  const totalPages =
    pagination?.totalPages ??
    Math.max(1, Math.ceil(totalEntries / (pagination?.pageSize || 10)));
  const currentPage = pagination?.currentPage ?? 1;
  const pageSize = pagination?.pageSize ?? 10;
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);
  const itemName = pagination?.itemName ?? "entries";

  return (
    <Card
      className={cn(
        "bg-card border border-border rounded-2xl shadow-xs overflow-hidden flex flex-col flex-1 min-h-0",
        className
      )}
    >
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <Table className={cn("w-full text-left border-collapse", minWidth, tableClassName)}>
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-border bg-secondary/50 backdrop-blur-sm hover:bg-secondary/50"
              >
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { className?: string }
                    | undefined;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "py-3.5 px-6 text-xs font-semibold text-muted-foreground tracking-wider uppercase h-auto",
                        meta?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-border/60">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-secondary/30 transition-colors group border-b border-border/60"
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as
                      | { className?: string }
                      | undefined;

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn("py-4 px-6 text-foreground", meta?.className)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="py-16 text-center text-muted-foreground"
                >
                  {emptyState ?? (
                    <p className="text-sm text-muted-foreground">No records found</p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 px-6 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
          {/* Entry Counter & Page Size Selector */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              Showing <span className="font-semibold text-foreground">{startEntry}</span> to{" "}
              <span className="font-semibold text-foreground">{endEntry}</span> of{" "}
              <span className="font-semibold text-foreground">{totalEntries}</span> {itemName}
            </div>

            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select
                value={String(pageSize)}
                onValueChange={(val) => pagination.onPageSizeChange(Number(val))}
              >
                <SelectTrigger className="h-7 w-16 text-xs bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>per page</span>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            {/* Previous Button */}
            <button
              onClick={() => pagination.onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border border-border"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-1 text-muted-foreground">...</span>
                    )}
                    <button
                      onClick={() => pagination.onPageChange(page)}
                      className={cn(
                        "w-8 h-8 rounded-lg font-medium text-xs flex items-center justify-center transition-all cursor-pointer",
                        currentPage === page
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-foreground/80 hover:bg-secondary hover:text-foreground border border-border"
                      )}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            {/* Next Button */}
            <button
              onClick={() => pagination.onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border border-border"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default DataTable;
