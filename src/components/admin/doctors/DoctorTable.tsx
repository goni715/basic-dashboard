"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import DoctorDetailsModal from "@/components/modal/doctor/DoctorDetailsModal";
import UpdateApprovalStatusModal from "@/components/modal/doctor/UpdateApprovalStatusModal";
import ChangeDoctorStatusModal from "@/components/modal/doctor/ChangeDoctorStatusModal";
import { IDoctor, IDoctorPaginationMeta } from "@/types/doctor.type";
import { useDeleteDoctorMutation } from "@/redux/features/doctor/doctorApi";

interface DoctorTableProps {
  doctors: IDoctor[];
  meta?: IDoctorPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  onRefresh?: () => void;
}

export default function DoctorTable({
  doctors = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: DoctorTableProps) {
  const [doctorToDelete, setDoctorToDelete] = useState<IDoctor | null>(null);
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDeleteConfirm = async () => {
    if (!doctorToDelete) return;
    try {
      const id = doctorToDelete._id || doctorToDelete.id;
      if (id) {
        await deleteDoctor(id).unwrap();
      }
      setDoctorToDelete(null);
    } catch {
      // Error handled by onQueryStarted in doctorApi
    }
  };

  // Render Status Badge
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

  // Render Approval Status Badge
  const renderApprovalBadge = (approvalStatus?: string) => {
    const s = (approvalStatus || "pending").toLowerCase();
    if (s === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Approved
        </span>
      );
    }
    if (s === "rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    );
  };

  // Render User Status Badge
  const renderUserStatusBadge = (userStatus?: string) => {
    const s = (userStatus || "active").toLowerCase();
    if (s === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      );
    }
    if (s === "blocked") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Blocked
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Inactive
      </span>
    );
  };

  // Pagination bounds
  const totalItems = meta?.total ?? doctors.length;
  const totalPages = meta?.totalPages ?? Math.max(1, Math.ceil(totalItems / limit));
  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/40">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Doctor Profiles
            </h2>
            
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 hover:bg-blue-50 font-bold px-2 py-0.5 rounded-full text-xs border-0"
            >
              {totalItems} {totalItems === 1 ? "Doctor" : "Doctors"}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered doctors list, approval states, credentials, and verification status.
          </p>
        </div>

        {/* Limit Selector */}
        {onLimitChange && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto min-h-[300px]">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Doctor
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                Contact
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                BMDC No.
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                Specialization
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                User Status
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                Approval Status
              </TableHead>
              <TableHead className="font-semibold text-slate-600 whitespace-nowrap py-3.5 px-4 text-xs uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-600 text-right whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: limit > 5 ? 5 : limit }).map((_, i) => (
                <TableRow key={i} className="border-slate-100">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse" />
                      <div className="h-3.5 w-24 bg-slate-150 rounded animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-6 w-18 bg-slate-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="h-8 w-16 bg-slate-200 rounded-lg animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : doctors.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={8} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                      <Stethoscope className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-800 text-base">
                        No doctors found
                      </h3>
                      <p className="text-xs text-slate-500">
                        We could not find any doctor profiles matching your current filters or search terms.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Doctor Rows
              doctors.map((doc) => {
                const docId = doc._id || doc.id || "";
                const fullNameWithTitle = `${doc.title ? `${doc.title} ` : ""}${doc.fullName || doc.name || ""}`;

                return (
                  <TableRow
                    key={docId}
                    className="border-slate-100 hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Doctor Info */}
                    <TableCell className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-200 shrink-0 bg-blue-50 shadow-xs">
                          {doc.profileImg ? (
                            <AvatarImage
                              src={doc.profileImg}
                              alt={doc.fullName || doc.name}
                              className="object-cover"
                            />
                          ) : null}
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white font-bold text-xs">
                            {getInitials(doc.fullName || doc.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-900 text-sm whitespace-nowrap hover:text-blue-600 transition-colors">
                            {fullNameWithTitle}
                          </span>
                          {doc.designation ? (
                            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[170px]">
                              {doc.designation}
                            </span>
                          ) : doc.hospital ? (
                            <span className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                              {doc.hospital}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact (Email & Phone in one column) */}
                    <TableCell className="px-4 py-3">
                      <div className="flex flex-col gap-1 min-w-[170px]">
                        {/* Email */}
                        <div className="flex items-center gap-1.5 group/email">
                          <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                          <span
                            className="text-xs text-slate-600 font-medium truncate max-w-[165px]"
                            title={doc.email || "N/A"}
                          >
                            {doc.email || "N/A"}
                          </span>
                          {doc.email && (
                            <button
                              type="button"
                              onClick={() => handleCopy(doc.email, `${docId}-email`)}
                              className="opacity-0 group-hover/email:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer shrink-0"
                              title="Copy email"
                            >
                              {copiedId === `${docId}-email` ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                          <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="whitespace-nowrap">{doc.phone || "N/A"}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* BMDC Number */}
                    <TableCell className="px-4 whitespace-nowrap">
                      {doc.bmdcNumber ? (
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                          {doc.bmdcNumber}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">-</span>
                      )}
                    </TableCell>

                    {/* Specialization */}
                    <TableCell className="px-4 text-xs font-medium text-slate-700">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 font-medium border border-blue-100/80 whitespace-nowrap">
                        {doc.specialization || doc.specialty || "General"}
                      </span>
                    </TableCell>

                    {/* User Status */}
                    <TableCell className="px-4 whitespace-nowrap">
                      {renderUserStatusBadge(doc.userStatus)}
                    </TableCell>

                    {/* Approval Status */}
                    <TableCell className="px-4 whitespace-nowrap">
                      <UpdateApprovalStatusModal
                        doctor={doc}
                        trigger={
                          <button
                            type="button"
                            className="group/badge inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-all focus:outline-none"
                            title="Click to change approval status"
                          >
                            {renderApprovalBadge(doc.approvalStatus)}
                          </button>
                        }
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 whitespace-nowrap">
                      <ChangeDoctorStatusModal
                        doctor={doc}
                        trigger={
                          <button
                            type="button"
                            className="group/status inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-all focus:outline-none"
                            title="Click to change doctor status (Published, Draft, Archive)"
                          >
                            {renderStatusBadge(doc.status)}
                          </button>
                        }
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-6 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Eye Icon Column - Details Modal */}
                        <DoctorDetailsModal doctor={doc} />

                        {/* Approval Status Action */}
                        <UpdateApprovalStatusModal
                          doctor={doc}
                          trigger={
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                              title="Change Approval Status"
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                            </Button>
                          }
                        />

                        {/* Delete Doctor Action */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDoctorToDelete(doc)}
                          className="h-8 w-8 p-0 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                          title="Delete Doctor"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/40 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-900">{startItem}</span> to{" "}
          <span className="font-semibold text-slate-900">{endItem}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalItems}</span> doctors
        </div>

        {onPageChange && totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1 || isLoading || isFetching}
              className="h-8 px-2.5 rounded-lg border-slate-200 text-slate-700 hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>

            <span className="px-3 py-1 font-semibold text-slate-700 text-xs bg-white rounded-lg border border-slate-200">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages || isLoading || isFetching}
              className="h-8 px-2.5 rounded-lg border-slate-200 text-slate-700 hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(doctorToDelete)}
        onOpenChange={(open) => !open && setDoctorToDelete(null)}
      >
        <DialogContent className="sm:max-w-[420px] rounded-2xl p-6 bg-white border-slate-100 shadow-xl">
          <DialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 text-center">
              Delete Doctor Profile?
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-500 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {doctorToDelete?.title ? `${doctorToDelete.title} ` : ""}
                {doctorToDelete?.fullName || doctorToDelete?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex flex-row gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDoctorToDelete(null)}
              disabled={isDeleting}
              className="rounded-xl h-10 px-4 text-xs font-semibold border-slate-200 hover:bg-slate-50 flex-1 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="rounded-xl h-10 px-4 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white flex-1 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Yes, Delete</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
