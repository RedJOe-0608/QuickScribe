"use client"

import { useNoteContext } from "./context/NoteContext"
import NoteList from "./custom-components/NoteList"

export default function Home() {
  const { notes, tags, updateTag, deleteTag } = useNoteContext()

  return (
    <NoteList
      notes={notes}
      availableTags={tags}
      onUpdateTag={updateTag}
      onDeleteTag={deleteTag}
    />
  )
}