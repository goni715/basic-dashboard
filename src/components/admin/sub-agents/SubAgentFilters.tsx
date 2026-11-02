"use client";

import { useEffect, useState } from "react";
import { Search, X, RotateCcw, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubAgentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function SubAgentFilters({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}: SubAgentFiltersProps) {
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

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
    { label: "Blocked", value: "blocked" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-md min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search name, ref code, agency, email, phone..."
            className="pl-9 pr-9 bg-white border-slate-200 rounded-xl h-10 py-2 w-full text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500/20"
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

        {/* Status Filter */}
        <div className="w-full sm:w-44">
          <Select
            value={status || "all"}
            onValueChange={(val) => onStatusChange(val ?? "all")}
          >
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl h-10 px-3 text-sm shadow-xs">
              <div className="flex items-center gap-2 truncate">
                <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <SelectValue placeholder="All Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 shadow-md">
              {statusOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-sm cursor-pointer"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-10 px-3 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-semibold gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>
    </div>
  );
}

