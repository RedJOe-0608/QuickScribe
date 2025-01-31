import { useRouter } from "next/navigation"
import { Tag } from "../types/types"
import { useState, useTransition } from "react"
import LoadingWithoutOverlay from "./LoadingOverlay"

type NoteCardProps = {
    id:string
    title: string
    tags: Tag[]
}

const NoteCard = ({id,title,tags}: NoteCardProps) => {

    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const handleNavigate = () => {

        startTransition(() => {
            router.push(`/note/${id}`)
        })
    }

    if (isPending) {
        return <LoadingWithoutOverlay />;
      }

  return (
    <div
            key={id}
            onClick={handleNavigate}
            className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full bg-blue-400 text-white text-sm"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
  )
}

export default NoteCard
