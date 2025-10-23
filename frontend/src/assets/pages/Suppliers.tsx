import { InputGroup, Input } from "@chakra-ui/react"
import Card from "../components/Card"
import SearchIcon from "../utils/icons/SearchIcon"
import SuppliersTable from "../components/Suppliers/SuppliersTable"
import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import type { Supplier, SupplierPayload } from "@/types/suppliers"
import { toaster } from "@/components/ui/toaster"
import SupplierDialog from "../components/Suppliers/SupplierDialog"

export default function Suppliers() {
  const headers: string[] = [
    "Company Name",
    "Contact Name",
    "Email",
    "Phone Number",
    "Actions",
  ]

  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [inputValue, setInputValue] = useState("")
  const [onPost, setOnPost] = useState<SupplierPayload>()
  const [onPatch, setOnPatch] = useState<SupplierPayload>()
  const [onDeleteSupplier, setOnDeleteSupplier] = useState<number>(0)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/suppliers/")
        setSuppliers(res.data)
      } catch (error) {
        console.log("Error getting suppliers", error)
      }
    }
    fetchSuppliers()
  }, [suppliers])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const filteredSuppliers = useMemo(() => {
    const input = inputValue.trim().toLowerCase();

    return suppliers.filter(supplier => supplier.contactName.toLowerCase().includes(input))
  }, [suppliers, inputValue]);

  const onDelete = (id: number) => {
    setOnDeleteSupplier(id)
  }

  const handleForm = (data: { id?: number, companyName: string, contactName: string, email: string, phone: string }) => {
    if (data.id) {
      setOnPatch(data)
      return
    }
    setOnPost(data)
  }

  useEffect(() => {
    if (!onPost) return
    const fetchSuppliers = async () => {
      try {
        const res = await axios.post('http://localhost:3000/suppliers/', onPost)
        console.log(res)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        toaster.create({
          description: "Supplier created succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error creating supplier", error)
        toaster.create({
          description: "There was an error creating supplier",
          type: "error"
        })
      }
    }

    fetchSuppliers()
  }, [onPost])

  useEffect(() => {
    if (!onPatch) return
    const fetchSuppliers = async () => {
      try {
        await axios.patch(`http://localhost:3000/suppliers/${onPatch.id}`, onPatch)
        toaster.create({
          description: "Supplier updated succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error updating supplier", error)
        toaster.create({
          description: "There was an error updating supplier",
          type: "error"
        })
      }
    }

    fetchSuppliers()
  }, [onPatch])

  useEffect(() => {
    if (onDeleteSupplier === 0) return

    const deleteSupplier = async () => {
      try {
        await axios.delete(`http://localhost:3000/suppliers/${onDeleteSupplier}`)
        toaster.create({
          description: "Supplier deleted succesfully",
          type: "warning"
        })
      } catch (error) {
        console.log("Error deleting supplier", error)
        toaster.create({
          description: "There was an error deleting supplier",
          type: "error"
        })
      }
    }

    deleteSupplier()
  }, [onDeleteSupplier])

  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-[700]">Suppliers</h1>
          <span className="text-[#667085]">Manage your supplier database</span>
        </div>
        <SupplierDialog handleForm={handleForm} />
      </div>
      <Card minHeight="min-h-auto">
        <InputGroup startElement={<SearchIcon color="#667085" size="20" />}>
          <Input onChange={handleInput} className="bg-[#FAFAFA]" placeholder="Search supplier by company name" />
        </InputGroup>
      </Card>
      <Card>
        <h2 className="text-[26px] font-[500]">Supplier Database</h2>
        <SuppliersTable onDelete={onDelete} headers={headers} suppliers={filteredSuppliers} />
      </Card>
    </div>
  )
}