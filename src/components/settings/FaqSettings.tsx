"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Search, X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AddFaqModal from "@/components/modal/settings/AddFaqModal";
import EditFaqModal from "@/components/modal/settings/EditFaqModal";
import DeleteFaqModal from "@/components/modal/faq/DeleteFaqModal";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { FAQ_CATEGORY_LABELS } from "@/constants/faq.constant";
import { useDebouncedCallback } from "use-debounce";

export default function FaqSettings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchDebounce = useDebouncedCallback((val: string) => {
    setSearchTerm(val);
    setPage(1);
  }, 400);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearchDebounce(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchTerm("");
    setPage(1);
  };

  // Build Query Params for API
  const queryArgs: Record<string, unknown> = {
    page,
    limit,
  };
  if (searchTerm) {
    queryArgs.searchTerm = searchTerm;
  }
  if (isActive !== "all") {
    queryArgs.isActive = isActive === "true";
  }

  const { data, isLoading } = useGetFaqsQuery(queryArgs);

  const faqs = data?.data || [];
  const meta = data?.meta;
  const totalCount = meta?.total ?? faqs.length;
  const totalPages =
    meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header and Add Modal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">FAQ Management</h2>
          <p className="text-sm text-slate-500">
            Manage frequently asked questions for patients and partners.
          </p>
        </div>
        <AddFaqModal />
      </div>

      {/* Filters (Search & Status) */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search FAQ question or answer..."
            className="pl-9 pr-9 bg-white border-slate-200 rounded-xl h-10 py-2 w-full text-xs sm:text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500/20"
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

        <div className="w-full sm:w-44">
          <Select
            value={isActive}
            onValueChange={(val) => {
              setIsActive(val ?? "all");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl h-10 px-3 text-xs sm:text-sm shadow-xs">
              <span className="truncate">
                {isActive === "all"
                  ? "All Status"
                  : isActive === "true"
                  ? "Active"
                  : "Inactive"}
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-slate-100 shadow-md">
              <SelectItem value="all" className="text-xs sm:text-sm cursor-pointer">
                All Status
              </SelectItem>
              <SelectItem value="true" className="text-xs sm:text-sm cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="false" className="text-xs sm:text-sm cursor-pointer">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* FAQs Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/60">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                  Question & Answer
                </TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-xs uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx} className="border-slate-100 animate-pulse">
                    <TableCell className="py-4 px-6">
                      <div className="space-y-2 max-w-md">
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                        <div className="h-3 w-full bg-slate-100 rounded" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-24 bg-slate-200 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 bg-slate-200 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="h-8 w-16 bg-slate-200 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : faqs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-56 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto text-slate-500">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        No FAQs Found
                      </p>
                      <p className="text-xs text-slate-400">
                        Try modifying your search or filter options.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                faqs.map((faq) => {
                  const id = faq._id || faq.id || "";
                  const categoryLabel =
                    FAQ_CATEGORY_LABELS[faq.category] ||
                    faq.category
                      ?.split("_")
                      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ");

                  return (
                    <TableRow
                      key={id}
                      className="border-slate-100 hover:bg-slate-50/60 transition-colors group"
                    >
                      <TableCell className="py-4 px-6">
                        <div className="max-w-sm md:max-w-md lg:max-w-xl space-y-1">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                            {faq.question}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 font-semibold shadow-none w-fit text-[11px] whitespace-nowrap rounded-lg border border-blue-200/60"
                        >
                          {categoryLabel}
                        </Badge>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {faq.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            Inactive
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-right px-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit FAQ Modal */}
                          <EditFaqModal faq={faq} />

                          {/* Delete FAQ Modal */}
                          <DeleteFaqModal
                            faqId={id}
                            faqQuestion={faq.question}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Bar */}
        {!isLoading && totalCount > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing{" "}
              <span className="font-bold text-slate-800">
                {Math.min((page - 1) * limit + 1, totalCount)}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-800">
                {Math.min(page * limit, totalCount)}
              </span>{" "}
              of <span className="font-bold text-slate-800">{totalCount}</span>{" "}
              entries
            </div>

            <div className="flex items-center gap-2">
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-8 w-8 p-0 rounded-lg border-slate-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="px-2 font-semibold text-slate-700">
                  {page} / {Math.max(1, totalPages)}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-8 w-8 p-0 rounded-lg border-slate-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
