"use client"

import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import DiscardChangesDialog from './DiscardChangesDialog'
import { NoteData, Tag } from '../types/types'

// Dynamically import CreatableSelect with SSR disabled
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
}

const NoteForm = ({onSubmit} : NoteFormProps) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if the form has changes
  const hasChanges = title || selectedTags.length > 0 || body

  // Handle cancel button click
  const handleCancel = () => {
    if (hasChanges) {
      setIsModalOpen(true) // Show modal if there are changes
    } else {
      router.back() // Navigate back if the form is empty
    }
  }

  // Handle modal confirmation (discard changes)
  const handleDiscardChanges = () => {
    setIsModalOpen(false)
    setTitle('')
    setSelectedTags([])
    setBody('')
  }

  // Handle modal cancellation (keep changes)
  const handleKeepEditing = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const submittedData = {
      title,
      markdown: body,
      tags: selectedTags
    }
    console.log(submittedData);
    onSubmit(submittedData)
    
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-6 w-full max-w-2xl'>
      {/* Title and Tags Section */}
      <div className='flex flex-row space-x-4 w-full'>
        <Input
          className='w-1/2'
          placeholder='Enter note title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className='w-1/2'>
          <CreatableSelect
            className='w-full'
            placeholder='Select tags'
            isMulti
            value={selectedTags.map((tag) => {
              return {
                label: tag.label,
                value: tag.id
              }
            })}
            onChange={(tags: any) => {
              setSelectedTags(tags.map((tag: {label: string,value: string}) => {
                return {
                  label: tag.label,
                  id: tag.value
                }
              }))
            }}
          />
        </div>
      </div>

      {/* Body Section */}
      <textarea
        rows={10}
        className='w-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Write your note here...'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* Buttons Section */}
      <div className='flex justify-end space-x-4'>
        <Button
          type='button'
          variant='outline'
          size='default'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='create'
          size='default'
        >
          Save
        </Button>
      </div>

      {/* Discard Changes Dialog */}
      <DiscardChangesDialog
        isOpen={isModalOpen}
        onClose={handleKeepEditing}
        onDiscard={handleDiscardChanges}
      />
    </form>
  )
}

export default NoteForm