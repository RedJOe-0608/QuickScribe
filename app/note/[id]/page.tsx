"use client"
import { useNoteContext } from '@/app/context/NoteContext'
import DiscardChangesDialog from '@/app/custom-components/DiscardChangesDialog'
import LoadingWithoutOverlay from '@/app/custom-components/LoadingOverlay'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import ReactMarkdown from 'react-markdown'
import {ArrowBigLeft} from 'lucide-react'

const page = () => {
  const router = useRouter()
  const params = useParams()

  const {toast} = useToast()

  const [isPending, startTransition] = useTransition();

  const {notes,onDeleteNote} = useNoteContext()

    const [isModalOpen, setIsModalOpen] = useState(false)

  const specificNote = notes.find(note => note.id === params.id)

  console.log(specificNote?.markdown);
  

    const handleNavigate = (buttonType: string) => {

      if(buttonType === "back")
      {
        startTransition(() => {
          router.back()
        })

      }
      else if(buttonType === "edit")
      {
        startTransition(() => {
          router.push(`/note/${params.id}/edit`)
        })
      }
    }

    if (isPending) {
        return <LoadingWithoutOverlay />;
      }

    const handleDelete = () => {
      setIsModalOpen(true)
    }

    const handleClose = () => {
      setIsModalOpen(false)
    }

    const handleDiscardChanges = () => {
      onDeleteNote(params.id as string)

      toast({
        title: 'Note deleted successfully!',
        variant: "success"
      })

      setIsModalOpen(false)
      router.back()
    }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{specificNote?.title}</h1>
        <div className="flex space-x-4">
            <Button variant="secondary" size="default" onClick={() => handleNavigate("edit")}>
              Edit
            </Button>
            <Button variant="destructive" size="default" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="default" size="default" onClick={() => handleNavigate("back")}>
              <div className='flex items-center space-x-2'><ArrowBigLeft /> <span>Back</span></div> 
            </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
              {specificNote?.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full bg-blue-400 text-white text-sm"
                >
                  {tag.label}
                </span>
              ))}
      </div>
      <div className='mt-8'>
        <ReactMarkdown className="markdown">{specificNote?.markdown}</ReactMarkdown>
      </div>

      <DiscardChangesDialog
        isOpen={isModalOpen}
        onClose={handleClose}
        onDiscard={handleDiscardChanges}
        type="delete"
      />
    </div>
  )
}

export default page
