import DialogChakra from "../components/DialogChakra"
import CrossIcon from "../utils/icons/CrossIcon"
import { InputGroup, Input } from "@chakra-ui/react"
import Card from "../components/Card"
import SearchIcon from "../utils/icons/SearchIcon"
import SuppliersTable from "../components/Suppliers/SuppliersTable"
import { useState, useMemo, useEffect } from "react"
import SupplierForm from "../components/Suppliers/SupplierForm"
import axios from "axios"
import type { Supplier, SupplierPayload } from "@/types/suppliers"

export default function Suppliers() {
  const headers: string[] = [
    "Company Name",
    "Contact Name",
    "Email",
    "Phone Number",
    "Actions",
  ]

  const [copySuppliers, setCopySuppliers] = useState<Supplier[]>([])
  const [inputValue, setInputValue] = useState("")
  const [onPost, setOnPost] = useState<SupplierPayload>()
  const [onPatch, setOnPatch] = useState<SupplierPayload>()
  const [onDeleteSupplier, setOnDeleteSupplier] = useState<number>(0)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/suppliers/")
        setCopySuppliers(res.data)
      } catch (error) {
        console.log("Error getting suppliers", error)
      }
    }
    fetchSuppliers()
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const filteredSuppliers = useMemo(() => {
    const input = inputValue.trim().toLowerCase();

    return copySuppliers.filter(supplier => supplier.contactName.toLowerCase().includes(input))
  }, [copySuppliers, inputValue]);

  const onDelete = (id: number) => {
    setOnDeleteSupplier(id)
    setCopySuppliers(prev => prev.filter(supplier => supplier.id !== id))
  }

  const handleForm = (data: { id?: number, companyName: string, contactName: string, email: string, phone: string }) => {
    const newSupplier: Supplier = {
      id: data.id ? data.id : copySuppliers.length > 0 ? copySuppliers.length + 1 : 1,
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
    }
    if (data.id) {
      setOnPatch(data)
      setCopySuppliers(prev => prev.map(supplier => supplier.id === data.id ? newSupplier : supplier))
      return
    }
    setOnPost(data)
    setCopySuppliers(prev => [newSupplier, ...prev])
  }

  useEffect(() => {
    if (!onPost) return
    const fetchSuppliers = async () => {
      try {
        await axios.post('http://localhost:3000/suppliers/', onPost)
      } catch (error) {
        console.log("Error creating supplier", error)
      }
    }

    fetchSuppliers()
  }, [onPost])

  useEffect(() => {
    if (!onPatch) return
    const fetchSuppliers = async () => {
      try {
        await axios.patch(`http://localhost:3000/suppliers/${onPatch.id}`, onPatch)
      } catch (error) {
        console.log("Error updating supplier", error)
      }
    }

    fetchSuppliers()
  }, [onPatch])

  useEffect(() => {
    if (onDeleteSupplier === 0) return

    const deleteSupplier = async () => {
      try {
        await axios.delete(`http://localhost:3000/suppliers/${onDeleteSupplier}`)
      } catch (error) {
        console.log("Error deleting supplier", error)
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
        <DialogChakra
          buttonStyles="bg-[#5CE18C]"
          buttonText="Add Supplier"
          dialogTitle="Add New Supplier"
          saveButtonStyles="bg-[#5CE18C]"
          formId="supplierForm"
        >
          <CrossIcon color="#FFFFFF" size="10" />
          <SupplierForm formId="supplierForm" handleForm={handleForm} />
        </DialogChakra>
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