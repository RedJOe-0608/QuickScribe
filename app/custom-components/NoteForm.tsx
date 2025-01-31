"use client"

import { Input } from '@/components/ui/input'
import React, { FormEvent, useState, useCallback, useMemo, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import DiscardChangesDialog from './DiscardChangesDialog'
import { NoteData, Tag } from '../types/types'
import { v4 as uuidV4 } from "uuid"
import { useNoteContext } from '../context/NoteContext'
import { useToast } from '@/hooks/use-toast'

const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

type NoteFormProps = {
  onSubmit?: (data: NoteData) => void
  onUpdate?: (id:string,data: NoteData) => void
  type: string
} & Partial<NoteData>

const NoteForm = ({ onSubmit,onUpdate,title = '', markdown = '', tags = [],type }: NoteFormProps) => {
  console.log("rerendering...");
  
  const router = useRouter()
  const {id} = useParams()
  console.log("Whats the id:",id);
  
  const { addTag, tags: availableTags } = useNoteContext()
  const {toast} = useToast()
  
  // Refs for input fields
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  
  // State only for tags since they need special handling
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if form has changes using refs
  const checkForChanges = () => {
    return !!(
      (titleRef.current?.value || '').trim() || 
      (bodyRef.current?.value || '').trim() || 
      selectedTags.length > 0
    )
  }
  
  const clearForm = () => {
    if (titleRef.current) titleRef.current.value = ''
    if (bodyRef.current) bodyRef.current.value = ''
    setSelectedTags([])
  }

  const handleCancel = () => {
    if (type !== 'edit' && checkForChanges()) {
      setIsModalOpen(true)
    } else {
      router.back()
    }
  }

  const handleDiscardChanges = () => {
    clearForm()
    setIsModalOpen(false)
    // router.back()
  }

  const handleKeepEditing = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(onSubmit)
    {
      onSubmit({
        title: titleRef.current?.value || '',
        markdown: bodyRef.current?.value || '',
        tags: selectedTags
      })
    }
    else if(onUpdate){
      onUpdate(id as string,{
        title: titleRef.current?.value || '',
        markdown: bodyRef.current?.value || '',
        tags: selectedTags
      })
    }

    toast({
      title: type === 'create' ? "Note created successfully!" : "Note Edited successfully!",
      variant: "success"
    })
    clearForm()
  }

   const handleTagsChange = useCallback((tags: any) => {
    const newTags = tags.map((tag: {label: string, value: string}) => ({
      label: tag.label,
      id: tag.value
    }))
    setSelectedTags(newTags)
  }, [])

  const tagOptions = useMemo(() => {
    return availableTags?.map((tag) => ({
      label: tag.label,
      value: tag.id,
    }))
  }, [availableTags])

  const selectedTagValues = useMemo(() => {
    return selectedTags.map((tag) => ({
      label: tag.label,
      value: tag.id,
    }))
  }, [selectedTags])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-6 w-full max-w-2xl'>
      <div className='flex flex-row space-x-4 w-full'>
        <Input
          className='w-1/2'
          placeholder='Enter note title'
          ref={titleRef}
          defaultValue={title}
        />
        <div className='w-1/2'>
          <CreatableSelect
            className='w-full'
            placeholder='Select tags'
            isMulti
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label }
              addTag(newTag)
              setSelectedTags(prev => [...prev, newTag])
            }}
            value={selectedTagValues}
            options={tagOptions}
            onChange={handleTagsChange}
          />
        </div>
      </div>

      <textarea
        rows={10}
        className='w-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Write your note here...'
        ref={bodyRef}
        defaultValue={markdown}
      />

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
          onClick={() => router.back()}
        >
          {type === 'create' ? 'Save' : 'Edit'}
        </Button>
      </div>

      <DiscardChangesDialog
        isOpen={isModalOpen}
        onClose={handleKeepEditing}
        onDiscard={handleDiscardChanges}
      />
    </form>
  )
}

export default NoteForm