"use client"

import { useLocalStorage } from "./useLocalStorage"

type RawNote = {
  id: string
} & RawNoteData

type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id : string
  label: string
}
export default function Home() {
  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTES",[])
  const [tags,setTags] = useLocalStorage<Tag[]>("TAGS",[])
  return (
    <div>
      Home
    </div>
  );
}
