"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  Sparkles,
  Loader2,
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
import { HOSPITAL_COUNTRY_OPTIONS } from "@/constants/hospital.constant";
import {
  createHospitalSchema,
  type TCreateHospitalFormValues,
} from "@/schemas/hospital.schema";
import { useCreateHospitalMutation } from "@/redux/features/hospital/hospitalApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetCreateHospitalError } from "@/redux/features/hospital/hospitalSlice";

const CreateHospitalModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { CreateHospitalError } = useAppSelector((state) => state.hospital);
  const [createHospital, { isLoading }] = useCreateHospitalMutation();

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<TCreateHospitalFormValues>({
    resolver: zodResolver(createHospitalSchema),
    defaultValues: {
      name: "",
      country: "",
      address: "",
      contactNumber: "",
      email: "",
      website: "",
      status: "published",
    },
  });

  // Reset errors and clean preview on modal close
  useEffect(() => {
    if (open) {
      dispatch(SetCreateHospitalError(""));
      setImageError("");
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(null);
      setImagePreview(null);
      setImageError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, dispatch, imagePreview]);

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
      setImageError("");
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setImageError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (
    data: TCreateHospitalFormValues,
    overrideStatus?: "draft" | "published"
  ) => {
    dispatch(SetCreateHospitalError(""));

    if (!selectedImage) {
      setImageError("Hospital image is required");
      ErrorToast("Please select a hospital image");
      return;
    }

    const finalStatus = overrideStatus || "published";

    const payload: Record<string, unknown> = {
      name: data.name.trim(),
      country: data.country,
      address: data.address.trim(),
      contactNumber: data.contactNumber.trim(),
      email: data.email.trim().toLowerCase(),
      status: finalStatus,
    };

    if (data.website && data.website.trim().length > 0) {
      payload.website = data.website.trim();
    }

    if (selectedImage) {
      payload.image = selectedImage;
    }

    try {
      const res = await createHospital(payload);
      if (res?.data?.success || (!res?.error && res?.data)) {
        reset();
        handleRemoveImage();
        setOpen(false);
      }
    } catch {
      // Handled via onQueryStarted in hospitalApi
    }
  };

  const onPublishSubmit: SubmitHandler<TCreateHospitalFormValues> = (data) =>
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
        Add Hospital
      </DialogTrigger>

      <DialogContent className="sm:max-w-[720px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/70 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                Add New Hospital
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Register a patient-facing hospital profile with contact and facility details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form
          id="create-hospital-form"
          onSubmit={handleSubmit(onPublishSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="px-6 py-5 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* Error Banner */}
            {CreateHospitalError && (
              <ErrorAlert
                message={CreateHospitalError}
                onClose={() => dispatch(SetCreateHospitalError(""))}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="name"
                  label="Hospital Name"
                  control={control}
                  placeholder="e.g. Bangkok International Hospital"
                  icon={Building2}
                  required
                />
                <CustomSelect
                  name="country"
                  label="Country"
                  control={control}
                  options={[...HOSPITAL_COUNTRY_OPTIONS]}
                  placeholder="Select country"
                  icon={Globe}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomIconInput
                  name="contactNumber"
                  label="Contact Phone"
                  type="tel"
                  control={control}
                  placeholder="e.g. +8801700000000"
                  icon={Phone}
                  required
                />
                <CustomIconInput
                  name="email"
                  label="Contact Email"
                  type="email"
                  control={control}
                  placeholder="e.g. info@hospital.com"
                  icon={Mail}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <CustomIconInput
                  name="website"
                  label="Website URL"
                  type="url"
                  control={control}
                  placeholder="https://www.hospital.com"
                  helperText="Optional"
                  icon={Globe}
                />
              </div>
            </div>

            {/* SECTION 2: Location & Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-teal-700">
                  Location & Address
                </h3>
              </div>

              <div>
                <CustomTextArea
                  name="address"
                  label="Hospital Address"
                  control={control}
                  placeholder="e.g. 2 Soi Soonvijai 7, New Petchburi Rd, Bang Kapi, Huai Khwang, Bangkok 10310"
                  icon={MapPin}
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* SECTION 3: Hospital Image */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-purple-700">
                  Hospital Media
                </h3>
              </div>

              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="hospital-image-input"
                    className="text-xs sm:text-sm font-medium text-foreground/90 cursor-pointer select-none"
                  >
                    Hospital Photo / Banner <span className="text-destructive ml-0.5">*</span>
                  </Label>
                  <span className="text-[11px] text-muted-foreground">
                    JPG, PNG, WEBP (Max 5MB)
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  id="hospital-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {imagePreview ? (
                  <div className="h-16 w-full rounded-xl border border-input bg-slate-50/70 px-4 flex items-center justify-between gap-3 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={imagePreview}
                        alt="Hospital preview"
                        className="size-11 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-800 truncate font-semibold">
                          {selectedImage?.name || "hospital-image.jpg"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {selectedImage
                            ? `${(selectedImage.size / (1024 * 1024)).toFixed(2)} MB`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2.5 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-24 w-full rounded-xl border-2 border-dashed ${
                      imageError
                        ? "border-rose-400 bg-rose-50/30"
                        : "border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20"
                    } transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer group`}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform flex items-center justify-center">
                      <Upload className="size-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                      Click to upload hospital image
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </div>
                )}
                {imageError && (
                  <p className="text-xs text-rose-500 font-medium">{imageError}</p>
                )}
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

export default CreateHospitalModal;
