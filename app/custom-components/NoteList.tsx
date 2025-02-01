import { Button } from "@/components/ui/button"
import { Note, Tag } from "../types/types"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import Select from "react-select"
import NoteCard from "./NoteCard"
import EditTagsDialog from "./EditTagsDialog"

type NoteListProps = {
  notes: Note[]
  availableTags: Tag[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

const NoteList = ({ notes, availableTags, onUpdateTag, onDeleteTag }: NoteListProps) => {
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes?.filter(note => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })
  }, [title, selectedTags, notes])

  const handleTagsChange = useCallback((tags: any) => {
    const newTags = tags.map((tag: { label: string, value: string }) => ({
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
    return selectedTags?.map((tag) => ({
      label: tag.label,
      value: tag.id,
    }))
  }, [selectedTags])

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleUpdateTags = (updatedTags: Tag[], deletedTagIds: string[]) => {
    // Update tags
    updatedTags.forEach((tag) => onUpdateTag(tag.id, tag.label))
    // Delete tags
    deletedTagIds.forEach((id) => onDeleteTag(id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
       <div className="flex flex-col space-y-4">
       <h1 className="text-4xl font-bold text-gray-800">Quick<span className="text-green-600">Scribe</span> </h1>
       <h3 className="text-xl text-gray-500">All Notes</h3>
       </div>
        <div className="flex space-x-4">
          <Button variant="create" size="default" onClick={() => router.push('/new')}>
            Create
          </Button>
          <Button variant="default" size="default" onClick={() => setIsModalOpen(true)}>
            Edit Tags
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex py-4 space-x-2">
        <Input
          className="w-[30%]"
          placeholder="Search..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          className="w-[20%]"
          placeholder="Select tags"
          isMulti
          value={selectedTagValues}
          options={tagOptions}
          onChange={handleTagsChange}
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length === 0 ? (
          <div className="my-10">
            <h2 className="text-xl">No notes to show!!</h2>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                tags={note.tags}
              />
            </div>
          ))
        )}
      </div>

      <EditTagsDialog
        isOpen={isModalOpen}
        onClose={handleClose}
        onUpdate={handleUpdateTags}
        availableTags={availableTags}
      />
    </div>
  )
}

export default NoteList