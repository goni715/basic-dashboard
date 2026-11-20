"use client";

import { useEffect, useState } from "react";
import { Search, X, RotateCcw, Filter, LifeBuoy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORT_STATUS_OPTIONS } from "@/constants/support.constant";

interface SupportFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function SupportFilters({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}: SupportFiltersProps) {
  const [searchValue, setSearchValue] = useState(searchTerm);

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearchChange("");
  };

  const isFiltered = Boolean(searchTerm) || (status && status !== "all");

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-100 shadow-xs">
      <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search ticket, name, email, subject..."
            className="pl-10 pr-9 bg-slate-50/70 hover:bg-slate-50 border-slate-200 rounded-xl h-10 text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-blue-500/20 shadow-none transition-all"
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown Filter */}
        <div className="w-full sm:w-48">
          <Select
            value={status || "all"}
            onValueChange={(val) => onStatusChange(val ?? "all")}
          >
            <SelectTrigger className="w-full bg-slate-50/70 border-slate-200 rounded-xl h-10 px-3 text-xs sm:text-sm shadow-none focus-visible:ring-2 focus-visible:ring-blue-500/20">
              <div className="flex items-center gap-2 truncate">
                <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <SelectValue placeholder="All Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 shadow-md">
              {SUPPORT_STATUS_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset Filter Button */}
      {isFiltered && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="h-10 px-3.5 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-semibold gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </Button>
      )}
    </div>
  );
}
