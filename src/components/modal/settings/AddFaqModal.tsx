"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAQ_CATEGORY_OPTIONS } from "@/constants/faq.constant";
import { useCreateFaqMutation } from "@/redux/features/faq/faqApi";

interface AddFaqModalProps {
  trigger?: React.ReactNode;
}

const AddFaqModal = ({ trigger }: AddFaqModalProps) => {
  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general");
  const [isActive, setIsActive] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setQuestion("");
      setAnswer("");
      setCategory("general");
      setIsActive(true);
      setError(null);
    }
    setOpen(isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError("Question is required");
      return;
    }
    if (!answer.trim()) {
      setError("Answer is required");
      return;
    }

    try {
      await createFaq({
        question: question.trim(),
        answer: answer.trim(),
        category,
        isActive,
      }).unwrap();
      setOpen(false);
    } catch {
      // toast is handled in RTK query
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button className="w-full sm:w-auto h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs gap-2 cursor-pointer text-xs" />
          )
        }
      >
        {!trigger && (
          <>
            <Plus className="h-4 w-4" />
            Add FAQ
          </>
        )}
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-xl p-0 overflow-hidden border border-slate-100 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Add New FAQ
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 mt-0.5">
            Create a new frequently asked question for platform users.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-4">
            {error && (
              <div className="p-3 text-xs bg-rose-50 text-rose-700 rounded-xl border border-rose-200 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Question <span className="text-rose-500">*</span>
              </label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What services does this healthcare platform provide?"
                className="h-10 bg-white border-slate-200 rounded-xl text-xs sm:text-sm focus-visible:ring-blue-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Answer <span className="text-rose-500">*</span>
              </label>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide a comprehensive answer..."
                className="min-h-[120px] bg-white border-slate-200 rounded-xl text-xs sm:text-sm resize-none focus-visible:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <Select value={category} onValueChange={(val) => setCategory(val ?? "general")}>
                  <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl h-10 px-3 text-xs sm:text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-slate-100 shadow-md">
                    {FAQ_CATEGORY_OPTIONS.map((opt) => (
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

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-xs font-bold text-slate-700">Status</label>
                <div className="flex items-center gap-2 h-10 px-3 bg-slate-50/70 rounded-xl border border-slate-200">
                  <Switch
                    id="faq-status-new"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    className="data-[state=checked]:bg-emerald-500 cursor-pointer"
                  />
                  <Label
                    htmlFor="faq-status-new"
                    className="text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="border-slate-200 text-slate-700 hover:bg-slate-100 h-9 px-5 rounded-xl font-medium text-xs cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs cursor-pointer"
            >
              {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
              Save FAQ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFaqModal;
