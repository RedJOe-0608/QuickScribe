"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DiscardChangesDialogProps {
  isOpen: boolean
  onClose: () => void
  onDiscard: () => void
  type?: string
}

const DiscardChangesDialog = ({
  isOpen,
  onClose,
  onDiscard,
  type
}: DiscardChangesDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle> {type ? 'Delete note?' : 'Discard Changes?'} </DialogTitle>
          <DialogDescription>
            {type ? 'Yo are you sure you want to delete this note?' : 'You have unsaved changes. Are you sure you want to discard them?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
          >
            {type ? 'Cancel' : 'Keep Editing'}
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onDiscard}
          >
            {type ? 'Delete' : 'Discard Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DiscardChangesDialog