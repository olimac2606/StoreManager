import DialogChakra from "../components/DialogChakra"
import CrossIcon from "../utils/icons/CrossIcon"
import { InputGroup, Input } from "@chakra-ui/react"
import Card from "../components/Card"
import SearchIcon from "../utils/icons/SearchIcon"
import SuppliersTable from "../components/Suppliers/SuppliersTable"
import { useState, useMemo } from "react"
import SupplierForm from "../components/Suppliers/SupplierForm"

export default function Suppliers() {
    const headers: string[] = [
        "Company Name",
        "Contact Name",
        "Email",
        "Phone Number",
        "Actions",
    ]

    const suppliers = [
        { id: 1, name: "Tech Supplies Co.", contact: "Alice Johnson", email: "alijohn@gmail.com", phone: "555-1234" },
        { id: 2, name: "Home Goods Inc.", contact: "Bob Smith", email: "bobsmi@gmail.com", phone: "555-5678" },
        { id: 3, name: "Fashion Hub", contact: "Cathy Lee", email: "catlee@gmail.com", phone: "555-8765" },
        { id: 4, name: "Office Essentials", contact: "David Brown", email: "dabro@gmail.com", phone: "555-4321" },
        { id: 5, name: "Gadget World", contact: "Eva Green", email: "evagre@gmail.com", phone: "555-6789" },
        { id: 6, name: "Kitchen Kings", contact: "Frank White", email: "frawhi@gmail.com", phone: "555-9876" },
        { id: 7, name: "Outdoor Adventures", contact: "Grace Black", email: "grabla@gmail.com", phone: "555-5432" },
        { id: 8, name: "Book Nook", contact: "Hank Blue", email: "hanblu@gmail.com", phone: "555-2109" },
        { id: 9, name: "Toy Land", contact: "Ivy Red", email: "ivyred@gmail.com", phone: "555-6543" },
        { id: 10, name: "Pet Paradise", contact: "Jack Gray", email: "jacgra@gmail.com", phone: "555-3210" },
        { id: 11, name: "Auto Parts Plus", contact: "Karen Yellow", email: "karyel@gmail.com", phone: "555-7890" },
        { id: 12, name: "Beauty Bliss", contact: "Leo Purple", email: "leopur@gmail.com", phone: "555-0987" },
    ]
    const [copySuppliers, setCopySuppliers] = useState(suppliers)
    const [inputValue, setInputValue] = useState("")
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const filteredSuppliers = useMemo(() => {
        const input = inputValue.trim().toLowerCase();

        return copySuppliers.filter(product => product.name.toLowerCase().startsWith(input))
    }, [copySuppliers, inputValue]);

    const onDelete = (id: number) => {
        setCopySuppliers(prev => prev.filter(supplier => supplier.id !== id))
    }

    const handleForm = (data: { id?: number, companyName: string, contactPerson: string, email: string, phone: string }) => {
        const newSupplier = {
            id: data.id ? data.id : copySuppliers.length > 0 ? copySuppliers.length + 1 : 1,
            name: data.companyName,
            contact: data.contactPerson,
            email: data.email,
            phone: data.phone,
        }
        if (data.id) {
            setCopySuppliers(prev => prev.map(supplier => supplier.id === data.id ? newSupplier : supplier))
            return
        }
        setCopySuppliers(prev => [newSupplier, ...prev])
    }


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