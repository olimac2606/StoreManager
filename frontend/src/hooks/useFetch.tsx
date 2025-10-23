import { useEffect, useState } from "react"
import axios from "axios"
import { toaster } from "@/components/ui/toaster";

export function useFetch<T>(resource: string) {
  const [data, setData] = useState<T | null>([] as T)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/${resource}/`)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        setData(res.data)
      } catch (error) {
        console.log(`Error fetching data`, error)
        toaster.create({
          description: `There was an error fetching data`,
          type: "error"
        })
      }
    }
    fetch()
  }, [resource])
  return { data }
}