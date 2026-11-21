"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Briefcase,
  User,
  Mail,
  Phone,
  Lock,
  Building,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomIconInput from "@/components/common/CustomIconInput";
import {
  createAgentSchema,
  type TCreateAgentFormValues,
} from "@/schemas/agent.schema";
import { useCreateAgentMutation } from "@/redux/features/agent/agentApi";

export default function CreateAgentModal() {
  const [open, setOpen] = useState(false);
  const [createAgent, { isLoading }] = useCreateAgentMutation();

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<TCreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      fullName: "",
      agencyName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<TCreateAgentFormValues> = async (data) => {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      agencyName: data.agencyName.trim(),
      password: data.password.trim(),
    };

    try {
      const res = await createAgent(payload).unwrap();
      if (res?.success) {
        reset();
        setOpen(false);
      }
    } catch {
      // Handled via onQueryStarted toast in agentApi
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-600 text-white rounded-xl h-10 shadow-sm shadow-blue-500/20 px-5 font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Channel Partner</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[560px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                Add New Channel Partner
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Register a new channel partner representative to the platform.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            {/* Full Name */}
            <CustomIconInput
              name="fullName"
              label="Full Name"
              control={control}
              placeholder="e.g. Ashraful Islam"
              icon={User}
              required
            />

            {/* Agency Name */}
            <CustomIconInput
              name="agencyName"
              label="Agency Name"
              control={control}
              placeholder="e.g. Ashraful Agency"
              icon={Building}
              required
            />

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomIconInput
                name="email"
                label="Email Address"
                type="email"
                control={control}
                placeholder="ashraful@gmail.com"
                icon={Mail}
                required
              />
              <CustomIconInput
                name="phone"
                label="Phone Number"
                type="tel"
                control={control}
                placeholder="e.g. 01755555555"
                icon={Phone}
                required
              />
            </div>

            {/* Password */}
            <CustomIconInput
              name="password"
              label="Account Password"
              type="password"
              control={control}
              placeholder="e.g. 123456a"
              helperText="Must be at least 6 characters with a letter and number"
              icon={Lock}
              required
            />
          </div>

          {/* Footer */}
          <DialogFooter className="m-0 p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row gap-2.5 sm:justify-between items-center w-full shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
              className="rounded-xl h-10 px-5 border-slate-200 hover:bg-white text-slate-700 w-full sm:w-auto font-medium cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl h-10 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-600 text-white font-semibold shadow-sm shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Add Channel Partner</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
