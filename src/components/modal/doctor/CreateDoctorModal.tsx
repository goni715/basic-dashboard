"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Stethoscope,
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Banknote,
  MapPin,
  Clock,
  FileCheck,
  Save,
  Sparkles,
  Loader2,
  Award,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import CustomSelect from "@/components/common/CustomSelect";
import CustomTextArea from "@/components/common/CustomTextArea";
import ErrorAlert from "@/components/alert/ErrorAlert";
import { ErrorToast } from "@/helpers/ValidationHelper";
import {
  DOCTOR_TITLE_OPTIONS,
  DOCTOR_SPECIALIZATION_OPTIONS,
} from "@/constants/doctor.constant";
import {
  createDoctorSchema,
  type TCreateDoctorFormValues,
} from "@/schemas/doctor.schema";
import { useCreateDoctorMutation } from "@/redux/features/doctor/doctorApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetCreateDoctorError } from "@/redux/features/doctor/doctorSlice";

const CreateDoctorModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { CreateDoctorError } = useAppSelector((state) => state.doctor);
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<TCreateDoctorFormValues>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      title: "Dr.",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      specialization: "",
      bmdcNumber: "",
      designation: "",
      education: "",
      consultationFee: "",
      address: "",
      experience: "",
      about: "",
      qualifications: "",
      status: "published",
    },
  });

  // Reset errors and clean preview on modal close
  useEffect(() => {
    if (open) {
      dispatch(SetCreateDoctorError(""));
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [open, dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        ErrorToast("Image size must be less than 5MB");
        return;
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (
    data: TCreateDoctorFormValues,
    overrideStatus?: "draft" | "published"
  ) => {
    dispatch(SetCreateDoctorError(""));

    const finalStatus = overrideStatus || "published";

    const payload: Record<string, unknown> = {
      title: data.title,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      specialization: data.specialization,
      bmdcNumber: data.bmdcNumber?.trim() || "",
      designation: data.designation?.trim() || "",
      education: data.education?.trim() || "",
      consultationFee: Number(data.consultationFee) || 0,
      address: data.address?.trim() || "",
      experience: data.experience?.trim() || "",
      about: data.about?.trim() || "",
      qualifications: data.qualifications?.trim() || "",
      status: finalStatus,
    };

    if (data.password && data.password.trim().length > 0) {
      payload.password = data.password.trim();
    }

    if (selectedImage) {
      payload.image = selectedImage;
    }

    try {
      const res = await createDoctor(payload);
      if (res?.data?.success || (!res?.error && res?.data)) {
        reset();
        handleRemoveImage();
        setOpen(false);
      }
    } catch {
      // Handled via onQueryStarted in doctorApi
    }
  };

  const onPublishSubmit: SubmitHandler<TCreateDoctorFormValues> = (data) =>
    handleFormSubmit(data, "published");

  const onDraftClick = handleSubmit((data) =>
    handleFormSubmit(data, "draft")
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="w-full md:w-auto shrink-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-600 text-white rounded-xl h-10 shadow-sm shadow-blue-500/20 px-5 font-semibold transition-all duration-200 cursor-pointer" />
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Doctor
      </DialogTrigger>

      <DialogContent className="sm:max-w-[760px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/70 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                Add New Doctor
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Register a doctor profile and configure clinical consultation details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form
          id="create-doctor-form"
          onSubmit={handleSubmit(onPublishSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="px-6 py-5 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* Error Banner */}
            {CreateDoctorError && (
              <ErrorAlert
                message={CreateDoctorError}
                onClose={() => dispatch(SetCreateDoctorError(""))}
              />
            )}

            {/* SECTION 1: Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600">
                  Basic & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <CustomSelect
                    name="title"
                    label="Title"
                    control={control}
                    options={[...DOCTOR_TITLE_OPTIONS]}
                    placeholder="Select title"
                    icon={Award}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <CustomIconInput
                    name="fullName"
                    label="Full Name"
                    control={control}
                    placeholder="e.g. Mixa Mial"
                    icon={User}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="email"
                  label="Email Address"
                  type="email"
                  control={control}
                  placeholder="doctor@example.com"
                  icon={Mail}
                  required
                />
                <CustomIconInput
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  control={control}
                  placeholder="e.g. 013684644"
                  icon={Phone}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="password"
                  label="Account Password"
                  type="password"
                  control={control}
                  placeholder="Default: doctor6363"
                  helperText="Optional (defaults to doctor6363)"
                  icon={Lock}
                />

                {/* Profile Photo Upload System */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="doctor-photo-input"
                      className="text-xs sm:text-sm font-medium text-foreground/90 cursor-pointer select-none"
                    >
                      Profile Photo
                    </Label>
                    <span className="text-[11px] text-muted-foreground">
                      JPG, PNG, WEBP (Max 5MB)
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    id="doctor-photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {imagePreview ? (
                    <div className="h-10 data-[size=default]:h-10 min-h-10 w-full rounded-lg border border-input bg-slate-50/70 px-3 flex items-center justify-between gap-2 transition-all">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={imagePreview}
                          alt="Doctor preview"
                          className="size-7 rounded-md object-cover border border-slate-200 shrink-0"
                        />
                        <span className="text-xs text-slate-700 truncate font-medium max-w-[140px] sm:max-w-[170px]">
                          {selectedImage?.name || "doctor-photo.jpg"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove photo"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-10 data-[size=default]:h-10 min-h-10 w-full rounded-lg border border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 px-3 text-sm text-slate-600 transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Upload className="size-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                        Upload Doctor Photo
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Professional & Specialization */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-teal-700">
                  Clinical & Specialization Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomSelect
                  name="specialization"
                  label="Specialization"
                  control={control}
                  options={[...DOCTOR_SPECIALIZATION_OPTIONS]}
                  placeholder="Select doctor specialization"
                  icon={Stethoscope}
                  required
                />
                <CustomIconInput
                  name="bmdcNumber"
                  label="BMDC Registration Number"
                  control={control}
                  placeholder="e.g. AE456"
                  icon={ShieldCheck}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="designation"
                  label="Designation / Role"
                  control={control}
                  placeholder="e.g. Assistant Professor / Consultant"
                  icon={Briefcase}
                />
                <CustomIconInput
                  name="consultationFee"
                  label="Consultation Fee (৳ / $)"
                  type="number"
                  control={control}
                  placeholder="e.g. 400"
                  icon={Banknote}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="experience"
                  label="Experience"
                  control={control}
                  placeholder="e.g. 10 Years"
                  icon={Clock}
                />
                <CustomIconInput
                  name="address"
                  label="Chamber / Workplace Address"
                  control={control}
                  placeholder="e.g. Mohakhali, Dhaka"
                  icon={MapPin}
                />
              </div>
            </div>

            {/* SECTION 3: Education, Qualifications & About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-purple-700">
                  Qualifications & Biography
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="education"
                  label="Education Degrees"
                  control={control}
                  placeholder="e.g. MBBS, FCPS (Medicine)"
                  icon={GraduationCap}
                />
                <CustomIconInput
                  name="qualifications"
                  label="Additional Qualifications"
                  control={control}
                  placeholder="e.g. Fellow in Surgical Oncology"
                  icon={FileCheck}
                />
              </div>

              <div>
                <CustomTextArea
                  name="about"
                  label="About Doctor"
                  control={control}
                  placeholder="Provide a brief clinical biography, special areas of interest, or achievements..."
                  rows={3}
                  showCount
                  maxLength={500}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <DialogFooter className="m-0 p-5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row gap-3 sm:justify-between items-center w-full shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
              className="rounded-xl h-11 px-6 border-slate-200 hover:bg-white text-slate-700 w-full sm:w-auto font-medium transition-colors cursor-pointer"
            >
              Cancel
            </Button>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={onDraftClick}
                className="rounded-xl h-11 px-5 border-slate-200 hover:bg-white text-slate-700 w-full sm:w-auto font-medium cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                ) : (
                  <Save className="w-4 h-4 text-slate-500" />
                )}
                <span>Save Draft</span>
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-xl h-11 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-600 text-white shadow-md shadow-blue-500/20 font-semibold w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
                <span>Save & Publish</span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDoctorModal;
