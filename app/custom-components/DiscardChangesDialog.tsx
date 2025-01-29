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
}

const DiscardChangesDialog = ({
  isOpen,
  onClose,
  onDiscard,
}: DiscardChangesDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Discard Changes?</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Are you sure you want to discard them?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
          >
            Keep Editing
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onDiscard}
          >
            Discard Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DiscardChangesDialog