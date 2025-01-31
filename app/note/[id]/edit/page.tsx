"use client"

import { useParams } from 'next/navigation'
import { useNoteContext } from '../../../context/NoteContext'
import NoteForm from '../../../custom-components/NoteForm'

const Page = () => {

  const params = useParams()
  const {onUpdateNote} = useNoteContext()

  const {notes} = useNoteContext()

  const specificNote = notes.find(note => note.id === params.id)

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Edit Note</h1>
      <NoteForm
      title={specificNote?.title}
      markdown={specificNote?.markdown}
      tags={specificNote?.tags}
       onUpdate={onUpdateNote}
       type='edit'
      />
    </div>
  )
}

export default Page