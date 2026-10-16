"use client";

import React, { useState } from "react";
import { Search, RotateCcw, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ListHeaderProps {
  title: string;
  total?: number;
  searchDefaultValue?: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;
  onRefresh?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
  leftField?: React.ReactNode;
  rightField?: React.ReactNode;
}

const ListHeader = ({
  title,
  total,
  searchDefaultValue = "",
  searchPlaceholder = "Search...",
  onSearchChange,
  onRefresh,
  isFetching = false,
  isLoading = false,
  onResetFilters,
  hasActiveFilters = false,
  leftField,
  rightField,
}: ListHeaderProps) => {
  const [searchValue, setSearchValue] = useState(searchDefaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearchChange("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Title & Right Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
          {typeof total === "number" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {total.toLocaleString()}
            </span>
          )}
        </div>

        {rightField && (
          <div className="flex items-center gap-2">
            {rightField}
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left Side: Search + Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-72 md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none flex items-center">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder={searchPlaceholder}
              className="w-full h-9.5 pl-9 pr-8 bg-secondary/50 rounded-xl border border-input text-xs text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Left Field (Selects, Status filters, etc.) */}
          {leftField}

          {/* Reset Filters Button */}
          {hasActiveFilters && onResetFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-9.5 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        {/* Right Side: Refresh */}
        {onRefresh && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={isFetching || isLoading}
              className="h-9.5 w-9.5 rounded-xl border-input hover:bg-secondary cursor-pointer"
              title="Refresh data"
            >
              <RefreshCw
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isFetching && "animate-spin text-primary"
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
