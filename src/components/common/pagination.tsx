"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  startEntry: number;
  endEntry: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalEntries,
  startEntry,
  endEntry,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 px-6 pb-5 text-xs text-muted-foreground border-t border-border">
      {/* Entry counter */}
      <div>
        Showing <span className="font-semibold text-foreground">{startEntry}</span> to{" "}
        <span className="font-semibold text-foreground">{endEntry}</span> of{" "}
        <span className="font-semibold text-foreground">{totalEntries}</span> entries
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer border border-border"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 rounded-lg font-medium text-xs flex items-center justify-center transition-all cursor-pointer",
                isActive
                  ? "bg-foreground text-background shadow-2xs"
                  : "text-foreground/80 hover:bg-secondary hover:text-foreground border border-border"
              )}
            >
              {page}
            </button>
          );
        })}

        {totalPages > 3 && (
          <span className="px-1 text-muted-foreground">...</span>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer border border-border"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
