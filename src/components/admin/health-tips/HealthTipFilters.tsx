import { Input } from "@/components/ui/input";
import AddHealthTipModal from "@/components/modal/health-tip/AddHealthTipModal";

export default function () {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <Input 
        placeholder="Search health tip title or category..." 
        className="max-w-md h-11 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl"
      />
      <AddHealthTipModal />
    </div>
  );
}
