export function HospitalStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
          <div className="h-4 w-4 bg-blue-600 rounded-full ring-4 ring-blue-100"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">4</h2>
        <p className="text-slate-500 text-sm font-medium">Total Hospitals</p>
      </div>
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
          <div className="h-4 w-4 bg-emerald-500 rounded-full ring-4 ring-emerald-100"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">3</h2>
        <p className="text-slate-500 text-sm font-medium">Published Hospitals</p>
      </div>
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-2">
          <div className="h-4 w-4 bg-teal-500 rounded-full ring-4 ring-teal-100"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">3</h2>
        <p className="text-slate-500 text-sm font-medium">Bengali Support</p>
      </div>
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
          <div className="h-4 w-4 bg-amber-500 rounded-full ring-4 ring-amber-100"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">1</h2>
        <p className="text-slate-500 text-sm font-medium">Pending Review</p>
      </div>
    </div>
  );
}
