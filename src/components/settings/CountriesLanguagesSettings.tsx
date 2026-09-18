"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CountriesLanguagesSettings() {
  const enabledCountries = ["Bangladesh", "Thailand", "India"];
  const disabledCountries = ["China", "Singapore", "Nepal", "Malaysia"];
  
  const enabledLanguages = ["Bengali", "English"];
  const disabledLanguages = ["Hindi", "Thai", "Mandarin", "Arabic"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Countries & Languages</h2>
      </div>

      <div className="space-y-6">
        {/* Countries */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-slate-800">Enabled Countries</Label>
          <div className="flex flex-wrap gap-2">
            {enabledCountries.map(country => (
              <div key={country} className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                {country}
              </div>
            ))}
            {disabledCountries.map(country => (
              <div key={country} className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-50 transition-colors">
                {country}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <Label className="text-xs font-bold text-slate-700">Default Country</Label>
          <div className="relative">
            <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
              <option>Bangladesh</option>
              <option>Thailand</option>
              <option>India</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-slate-100"></div>

        {/* Languages */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-slate-800">Enabled Languages</Label>
          <div className="flex flex-wrap gap-2">
            {enabledLanguages.map(lang => (
              <div key={lang} className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                {lang}
              </div>
            ))}
            {disabledLanguages.map(lang => (
              <div key={lang} className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-50 transition-colors">
                {lang}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <Label className="text-xs font-bold text-slate-700">Default Language</Label>
          <div className="relative">
            <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
              <option>English</option>
              <option>Bengali</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button className="h-11 px-8 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
