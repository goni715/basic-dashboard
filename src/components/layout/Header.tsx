import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Laptop } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";
import { clearSession } from "@/helpers/SessionHelper";
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
  const displayName = "Admin";
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
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
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm transition-transform hover:scale-105">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-slate-700 capitalize">{displayName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-slate-700 focus:bg-slate-50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
            <Laptop className="mr-2 h-4 w-4" />
            <span>Logout from all devices</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
