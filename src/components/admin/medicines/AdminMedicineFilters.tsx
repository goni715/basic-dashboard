import { Input } from "@/components/ui/input";
import AddMedicineModal from "@/components/modal/medicine/AddMedicineModal";

export default function () {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <Input 
        placeholder="Search medicine, brand, usage..." 
        className="max-w-md h-11 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl"
      />
      <AddMedicineModal />
    </div>
  );
}
