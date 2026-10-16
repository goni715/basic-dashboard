import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "sidebar" | "icon-only";
  subtitle?: string;
  href?: string;
}

const Logo = ({
  className,
  variant = "horizontal",
  subtitle,
  href = "/",
}: LogoProps) => {
  const content = (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {variant === "sidebar" ? (
        <>
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-secondary/50 border border-border/80 shadow-2xs">
            <Image
              src="/logo.png"
              alt="Heritage & Hearth Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full p-1"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[15px] leading-tight text-foreground truncate font-sans tracking-tight">
              Heritage & Hearth
            </span>
            <span className="text-[11px] font-normal text-muted-foreground leading-normal truncate">
              {subtitle || "Super Admin Console"}
            </span>
          </div>
        </>
      ) : variant === "icon-only" ? (
        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-secondary/50 border border-border/80">
          <Image
            src="/logo.png"
            alt="Heritage & Hearth Logo"
            width={40}
            height={40}
            className="object-contain w-full h-full p-1"
            priority
          />
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Heritage & Hearth Logo"
              width={32}
              height={32}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="font-semibold text-lg text-foreground tracking-tight">
            Heritage & Hearth
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default Logo;
