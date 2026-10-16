"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Mail, Lock } from "lucide-react";
import { loginSchema } from "@/schemas/auth.schema";
import CustomIconInput from "@/components/common/CustomIconInput";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import SubmitButton from "@/components/common/SubmitButton";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetLoginError } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

type TFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Clear previous login error on initial mount
  useEffect(() => {
    dispatch(SetLoginError(""));
  }, [dispatch]);

  const { handleSubmit, control } = useForm<TFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    dispatch(SetLoginError(""));
    try {
      const res = await login(data);
      if (res?.data?.success || res?.data?.data?.accessToken) {
        if (data.isRememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        router.push("/");
      }
    } catch {
      // Error handled in onQueryStarted via authApi and authSlice
    }
  };

  return (
    <div className="space-y-4">
      {LoginError && (
        <ErrorAlert
          message={LoginError}
          onClose={() => dispatch(SetLoginError(""))}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <CustomIconInput
          label="Email Address"
          name="email"
          type="email"
          control={control}
          placeholder="admin@example.com"
          icon={Mail}
          disabled={isLoading}
          autoComplete="email"
          required
        />

        <CustomIconInput
          label="Password"
          name="password"
          type="password"
          control={control}
          placeholder="••••••••"
          icon={Lock}
          disabled={isLoading}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between text-sm">
          <CustomCheckbox
            control={control}
            name="isRememberMe"
            label="Remember me"
            disabled={isLoading}
          />
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-muted-foreground hover:text-primary hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <SubmitButton
          isLoading={isLoading}
          loadingTitle="Signing in..."
          className="h-10 text-sm font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-lg"
        >
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
};

export default LoginForm;
