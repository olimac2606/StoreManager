import { toaster } from "@/components/ui/toaster"
import axios from "axios"
import { useEffect, useState } from "react"


export function usePost(linkResource: string, textResource: string, dataToSend: Object | undefined) {
  const [data, setData] = useState()
  // Handle creation with API call and user feedback
  useEffect(() => {
    if (!dataToSend) return
    const fetchSuppliers = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/${linkResource}/`, dataToSend)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        setData(res.data)
        toaster.create({
          description: `${textResource} created succesfully"`,
          type: "success"
        })
      } catch (error) {
        console.log(`Error creating ${textResource}`, error)
        toaster.create({
          description: `There was an error creating ${textResource}`,
          type: "error"
        })
      }
    }

    fetchSuppliers()
  }, [dataToSend])
  return { data }
}