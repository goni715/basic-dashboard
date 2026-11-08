"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Building2,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IHospital, IHospitalPaginationMeta } from "@/types/hospital.type";
import { useDeleteHospitalMutation } from "@/redux/features/hospital/hospitalApi";
import UpdateHospitalModal from "@/components/modal/hospital/UpdateHospitalModal";
import ChangeHospitalStatusModal from "@/components/modal/hospital/ChangeHospitalStatusModal";

interface HospitalTableProps {
  hospitals?: IHospital[];
  meta?: IHospitalPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
}

export default function HospitalTable({
  hospitals = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: HospitalTableProps) {
  const [hospitalToDelete, setHospitalToDelete] = useState<IHospital | null>(null);
  const [deleteHospital, { isLoading: isDeleting }] = useDeleteHospitalMutation();

  const handleDeleteConfirm = async () => {
    if (!hospitalToDelete) return;
    try {
      const id = hospitalToDelete._id || hospitalToDelete.id;
      if (id) {
        await deleteHospital(id).unwrap();
      }
      setHospitalToDelete(null);
    } catch {
      // Handled via onQueryStarted in hospitalApi
    }
  };

  const renderStatusBadge = (status?: string) => {
    const s = (status || "draft").toLowerCase();
    if (s === "published") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Published
        </span>
      );
    }
    if (s === "archive") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
          Archive
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Draft
      </span>
    );
  };

  const totalPages = meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);
  const totalCount = meta?.total !== undefined ? meta.total : hospitals.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gradient-to-r from-white to-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Hospital List</h2>
            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Registered hospitals shown in the patient application.
          </p>
        </div>

        {meta?.total !== undefined && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg w-fit">
            Total: <span className="text-slate-900 font-bold">{meta.total}</span> Hospitals
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/60">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Hospital
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Contact Info
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Address
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Website
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
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="border-slate-100 animate-pulse">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-slate-200 shrink-0" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-36 bg-slate-200 rounded" />
                        <div className="h-2.5 w-24 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="h-3 w-28 bg-slate-200 rounded" />
                      <div className="h-2.5 w-32 bg-slate-100 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-40 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-20 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="h-8 w-8 bg-slate-200 rounded-lg ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : hospitals.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto text-slate-500">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <p className="text-base font-semibold text-slate-800">No Hospitals Found</p>
                    <p className="text-xs text-slate-400">
                      No hospitals match your search criteria. Click &quot;Add Hospital&quot; above to create a new profile.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              hospitals.map((hospital) => {
                const id = hospital._id || hospital.id || "";
                return (
                  <TableRow
                    key={id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Hospital Info & Image */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {hospital.image ? (
                          <img
                            src={hospital.image}
                            alt={hospital.name}
                            className="h-11 w-11 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center shrink-0 shadow-xs text-white">
                            <Building2 className="h-5 w-5" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-900 text-sm truncate max-w-[220px]">
                            {hospital.name}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {hospital.createdAt
                              ? new Date(hospital.createdAt).toLocaleDateString()
                              : "Registered Hospital"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact Phone & Email */}
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {hospital.contactNumber && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{hospital.contactNumber}</span>
                          </div>
                        )}
                        {hospital.email && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{hospital.email}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Address & Country */}
                    <TableCell>
                      <div className="flex flex-col gap-1 max-w-[240px]">
                        {hospital.country && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                            {hospital.country}
                          </div>
                        )}
                        <div className="flex items-start gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {hospital.address || hospital.location || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Website */}
                    <TableCell>
                      {hospital.website ? (
                        <a
                          href={hospital.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span className="max-w-[120px] truncate">Visit Site</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic">None</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="whitespace-nowrap">
                      <ChangeHospitalStatusModal
                        hospital={hospital}
                        trigger={
                          <button
                            type="button"
                            className="group/status inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-all focus:outline-none"
                            title="Click to change hospital status (Published, Draft, Archive)"
                          >
                            {renderStatusBadge(hospital.status)}
                          </button>
                        }
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <UpdateHospitalModal hospital={hospital} />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setHospitalToDelete(hospital)}
                          className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete hospital"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
            of <span className="font-bold text-slate-800">{totalCount}</span> entries
          </div>

          <div className="flex items-center gap-2">
            {onLimitChange && (
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => onPageChange && onPageChange(page - 1)}
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
                onClick={() => onPageChange && onPageChange(page + 1)}
                className="h-8 w-8 p-0 rounded-lg border-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(hospitalToDelete)}
        onOpenChange={(open) => !open && setHospitalToDelete(null)}
      >
        <DialogContent className="sm:max-w-[420px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl">
          <DialogHeader className="gap-2">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1">
              <AlertCircle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900">
              Delete Hospital?
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-slate-900 font-semibold">
                {hospitalToDelete?.name}
              </strong>
              ? This action cannot be undone and will remove the hospital from the system.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => setHospitalToDelete(null)}
              className="rounded-xl h-10 border-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
              className="rounded-xl h-10 bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Trash2 className="h-4 w-4 text-white" />
              )}
              <span>Delete Hospital</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
