"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import DiscardChangesDialog from './DiscardChangesDialog'

// Dynamically import CreatableSelect with SSR disabled
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

const NoteForm = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [body, setBody] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if the form has changes
  const hasChanges = title || tags.length > 0 || body

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
    setTags([])
    setBody('')
  }

  // Handle modal cancellation (keep changes)
  const handleKeepEditing = () => {
    setIsModalOpen(false)
  }

  return (
    <form className='flex flex-col space-y-6 w-full max-w-2xl'>
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
            // value={tags}
            // onChange={(selected) => setTags(selected)}
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