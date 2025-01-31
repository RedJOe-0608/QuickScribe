"use client"

import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "../useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { Note, NoteData, RawNoteData, Tag } from "../types/types"

type NoteContextType = {
  notes: Note[]
  tags: Tag[]
  onCreateNote: (data: NoteData) => void
  onUpdateNote: (id: string, data: NoteData) => void
  onDeleteNote: (id: string) => void
  addTag: (tag: Tag) => void
  updateTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useLocalStorage<RawNoteData[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes?.map((note:any) => {
      return { ...note, tags: tags.filter((tag:any) => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes:any) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag:any) => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes:any) => {
      return prevNotes.map((note:any) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag:any) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes:any) => {
      return prevNotes.filter((note:any) => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags((prev:any) => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags:any) => {
      return prevTags.map((tag:any) => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags((prevTags:any) => {
      return prevTags.filter((tag:any) => tag.id !== id)
    })
  }

  return (
    <NoteContext.Provider 
      value={{ 
        notes: notesWithTags, 
        tags, 
        onCreateNote, 
        onUpdateNote, 
        onDeleteNote,
        addTag,
        updateTag,
        deleteTag
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export function useNoteContext() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider")
  }
  return context
}