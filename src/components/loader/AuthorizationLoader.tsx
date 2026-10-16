"use client";

import React from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorizationLoaderProps {
  message?: string;
  subtitle?: string;
  className?: string;
}

export const AuthorizationLoader: React.FC<AuthorizationLoaderProps> = ({
  message = "Checking Authorization",
  subtitle = "Please wait while we verify your credentials and permissions...",
  className,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Checking authorization"
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md overflow-hidden",
        className
      )}
    >
      {/* Ambient background glow effects */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-teal-400/15 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Center card content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full mx-auto p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Badge & Spinner Container */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Pulsing halo */}
          <div
            className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-blue-500/20 to-teal-400/20 animate-pulse blur-sm"
            aria-hidden="true"
          />

          {/* Rotating outer ring */}
          <div className="relative w-16 h-16 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center">
            <Loader2
              className="absolute w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin stroke-[2]"
              aria-hidden="true"
            />
            {/* Center icon badge */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          {message}
        </h3>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>

        {/* Subtle animated bouncing dots */}
        <div
          className="mt-6 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 dark:bg-blue-400/70 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 dark:bg-blue-400/70 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 dark:bg-blue-400/70 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default AuthorizationLoader;
