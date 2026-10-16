"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TProps = {
  message: string;
  title?: string;
  className?: string;
  onClose?: () => void;
};

const ErrorAlert = ({
  message,
  title,
  className,
  onClose,
}: TProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive dark:bg-destructive/15 dark:border-destructive/40 animate-in fade-in duration-200",
        className
      )}
    >
      <AlertCircle className="size-4 shrink-0 mt-0.5 text-destructive" />
      <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <p>{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-destructive/70 hover:text-destructive hover:bg-destructive/15 transition-colors cursor-pointer"
          aria-label="Dismiss error"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
