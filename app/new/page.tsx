"use client"

import { useNoteContext } from '../context/NoteContext'
import NoteForm from '../custom-components/NoteForm'

const Page = () => {
  const {onCreateNote} = useNoteContext()
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>New Note</h1>
      <NoteForm
       onSubmit={onCreateNote}
       type='create'
      />
    </div>
  )
}

export default Page