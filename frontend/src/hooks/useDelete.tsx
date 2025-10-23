// useDelete.tsx
import { toaster } from "@/components/ui/toaster"
import axios from "axios"
import { useEffect, useState } from "react"

export function useDelete(linkResource: string, textResource: string, id: number | undefined) {
  const [data, setData] = useState<number | null>(null)
  const [deleteTrigger, setDeleteTrigger] = useState(0)

  useEffect(() => {
    if (!id) return

    const deleteResource = async () => {
      try {
        const res = await axios.delete(`http://localhost:3000/${linkResource}/${String(id)}`)
        const affected = res.data.affected ?? 0

        if (affected > 0) {
          toaster.create({
            description: `${textResource} deleted successfully`,
            type: "warning",
          })
        } else {
          toaster.create({
            description: `${textResource} could not be deleted`,
            type: "error",
          })
        }

        setData(affected)
        setDeleteTrigger(prev => prev + 1) // Force update
      } catch (error) {
        console.error(`Error deleting ${textResource}`, error)
        toaster.create({
          description: `There was an error deleting ${textResource}`,
          type: "error",
        })
        setData(0)
        setDeleteTrigger(prev => prev + 1)
      }
    }

    deleteResource()
  }, [id])

  return { data, deleteTrigger }
}
