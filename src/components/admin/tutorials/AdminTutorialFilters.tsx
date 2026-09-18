import { Input } from "@/components/ui/input";
import AddTutorialModal from "@/components/modal/tutorial/AddTutorialModal";

export function AdminTutorialFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <Input 
        placeholder="Search tutorial title or category..." 
        className="max-w-md h-11 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl"
      />
      <AddTutorialModal />
    </div>
  );
}
