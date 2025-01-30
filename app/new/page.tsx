import NoteForm from '../custom-components/NoteForm'
import { NoteData } from '../types/types'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
}
const Page = ({onSubmit} : NewNoteProps) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>New Note</h1>
      <NoteForm
       onSubmit={onSubmit}
      />
    </div>
  )
}

export default Page