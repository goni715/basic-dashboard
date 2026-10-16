"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Laptop } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import LogoutConfirmModal from "@/components/modal/auth/LogoutConfirmModal";
import { getUserInfo, clearSession } from "@/helpers/SessionHelper";
import { useLogoutMutation, useLogoutFromAllMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ fullName?: string; email?: string; profileImg?: string }>({});

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutType, setLogoutType] = useState<"single" | "all">("single");

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [logoutFromAll, { isLoading: isLoggingOutAll }] = useLogoutFromAllMutation();

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  const displayName = userInfo.fullName || "Admin";

  const handleOpenLogout = (type: "single" | "all") => {
    setLogoutType(type);
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      if (logoutType === "single") {
        await logout({}).unwrap();
      } else {
        await logoutFromAll({}).unwrap();
      }
    } catch {
      // In case onQueryStarted hasn't redirected
      clearSession();
      router.push("/login");
    } finally {
      setLogoutModalOpen(false);
    }
  };

  const isPending = isLoggingOut || isLoggingOutAll;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sidebar hideDesktop />
          </div>
          <div className="hidden lg:flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Panel</h1>
            <p className="text-[13px] font-medium text-slate-500 mt-0.5 hidden sm:block">
              Monitor all platform modules, recent activities, and monthly performance.
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-3 outline-none cursor-pointer select-none"
            disabled={isPending}
          >
            <Avatar className="h-10 w-10 border border-slate-100 shadow-sm transition-transform hover:scale-105">
              <AvatarImage src={userInfo.profileImg || ""} alt={displayName} />
              <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-slate-700 capitalize">{displayName}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold text-slate-800">
                {displayName}
                {userInfo.email && (
                  <span className="block text-xs font-normal text-slate-500 truncate mt-0.5">
                    {userInfo.email}
                  </span>
                )}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleOpenLogout("single")}
              disabled={isPending}
              className="cursor-pointer text-slate-700 focus:bg-slate-50 py-2.5"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleOpenLogout("all")}
              disabled={isPending}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 py-2.5"
            >
              <Laptop className="mr-2 h-4 w-4" />
              <span>Logout from all devices</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Confirmation Modal */}
      <LogoutConfirmModal
        open={logoutModalOpen}
        onOpenChange={setLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        isLoading={logoutType === "single" ? isLoggingOut : isLoggingOutAll}
        isAllDevices={logoutType === "all"}
      />
    </>
  );
}
