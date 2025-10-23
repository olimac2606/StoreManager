import { toaster } from "@/components/ui/toaster"
import axios from "axios"
import { useEffect, useState } from "react"


export function usePatch(linkResource: string, textResource: string, dataToSend: Object | undefined, id: number | undefined) {
  const [data, setData] = useState<number | null>(null)
  const [patchTrigger, setPatchTrigger] = useState(0)

  useEffect(() => {
    if (!id) return

    const patchResource = async () => {
      try {
        const res = await axios.patch(`http://localhost:3000/${linkResource}/${String(id)}`, dataToSend)
        const affected = res.data.affected ?? 0
        if (affected > 0) {
          toaster.create({
            description: `${textResource} updated successfully`,
            type: "warning",
          })
        } else {
          toaster.create({
            description: `${textResource} could not be deleted`,
            type: "error",
          })
        }

        setData(affected)
        setPatchTrigger(prev => prev + 1) // Force update
      } catch (error) {
        console.error(`Error deleting ${textResource}`, error)
        toaster.create({
          description: `There was an error deleting ${textResource}`,
          type: "error",
        })
        setData(0)
        setPatchTrigger(prev => prev + 1)
      }
    }

    patchResource()
  }, [id])

  return { data, patchTrigger }
}