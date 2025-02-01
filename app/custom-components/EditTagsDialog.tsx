"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tag } from '../types/types'
import { useState, useEffect } from 'react'

interface EditTagsDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedTags: Tag[], deletedTagIds: string[]) => void
  availableTags: Tag[]
}

const EditTagsDialog = ({
  isOpen,
  onClose,
  onUpdate,
  availableTags
}: EditTagsDialogProps) => {
  // Local state for tags and deleted tag IDs
  const [tags, setTags] = useState<Tag[]>([])
  const [deletedTagIds, setDeletedTagIds] = useState<string[]>([])

  // Sync local state with availableTags when the dialog opens
  useEffect(() => {
    if (isOpen) {
      setTags([...availableTags])
      setDeletedTagIds([])
    }
  }, [isOpen, availableTags])

  // Handle tag label updates
  const handleTagChange = (id: string, label: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === id ? { ...tag, label } : tag
      )
    )
  }

  // Handle tag deletions
  const handleDeleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
    setDeletedTagIds((prevIds) => [...prevIds, id])
  }

  // Handle form submission (Confirm Changes)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(tags, deletedTagIds)
    onClose()
  }

  // Handle dialog close (Discard Changes)
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} autoFocus={false}>
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  value={tag.label}
                  onChange={(e) => handleTagChange(tag.id, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  ❌
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter className='mt-4'>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="create"
            >
              Confirm Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTagsDialog