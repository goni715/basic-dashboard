import * as React from "react"
import { NoteHeader } from "@/components/doctor/notes/NoteHeader"
import { NoteLeftColumn } from "@/components/doctor/notes/NoteLeftColumn"
import { NoteRightColumn } from "@/components/doctor/notes/NoteRightColumn"

export default function ConsultationNotesPage() {
  return (
    <div className="space-y-6 pb-20">
      <NoteHeader />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <NoteLeftColumn />
        <NoteRightColumn />
      </div>
    </div>
  )
}
