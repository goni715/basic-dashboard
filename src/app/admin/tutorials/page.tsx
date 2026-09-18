"use client";

import { useState } from "react";
import { DUMMY_ADMIN_TUTORIAL_STATS, DUMMY_ADMIN_TUTORIALS } from "@/data/admin-tutorial.data";
import { AdminTutorialStats } from "@/components/admin/tutorials/AdminTutorialStats";
import { AdminTutorialFilters } from "@/components/admin/tutorials/AdminTutorialFilters";
import { AdminTutorialTable } from "@/components/admin/tutorials/AdminTutorialTable";

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState(DUMMY_ADMIN_TUTORIALS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Tutorial Management</h1>
        <p className="text-slate-500 text-sm">Manage tutorial videos, categories, guides, and related tutorials shown in the patient app.</p>
      </div>

      <AdminTutorialStats stats={DUMMY_ADMIN_TUTORIAL_STATS} />

      <AdminTutorialFilters />

      <AdminTutorialTable tutorials={tutorials} />
    </div>
  );
}
