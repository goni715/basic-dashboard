"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useDeleteFaqMutation } from "@/redux/features/faq/faqApi";

interface DeleteFaqModalProps {
  faqId: string;
  faqQuestion?: string;
  trigger?: React.ReactNode;
}

const DeleteFaqModal = ({
  faqId,
  faqQuestion = "this FAQ",
  trigger,
}: DeleteFaqModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteFaq, { isLoading }] = useDeleteFaqMutation();

  const handleDelete = async () => {
    if (!faqId) return;
    try {
      await deleteFaq(faqId).unwrap();
      setModalOpen(false);
    } catch {
      // toast is handled in RTK query
    }
  };

  return (
    <>
      {trigger ? (
        <span onClick={() => setModalOpen(true)} className="cursor-pointer inline-flex">
          {trigger}
        </span>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setModalOpen(true)}
          className="h-8 w-8 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
          title="Delete FAQ"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="sm:max-w-md max-h-[90vh] p-0 overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-100"
        >
          <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
            <DialogHeader className="p-4 px-6 flex flex-row items-center justify-between">
              <DialogTitle className="text-lg font-bold text-slate-900">
                Delete FAQ
              </DialogTitle>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </DialogHeader>
          </div>

          <div className="px-6 py-6 text-center">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Are you sure?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              This action cannot be undone. This will permanently delete:
              <br />
              <span className="font-semibold text-slate-900 line-clamp-2 mt-1">
                &ldquo;{faqQuestion}&rdquo;
              </span>
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer h-10 text-xs font-semibold"
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={isLoading}
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer h-10 text-xs font-semibold shadow-xs"
              >
                {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
                Delete FAQ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteFaqModal;
