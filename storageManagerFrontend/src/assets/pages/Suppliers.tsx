import DialogChakra from "../components/DialogChakra"
import CrossIcon from "../utils/icons/CrossIcon"
import FormSupplier from "../components/FormSupplier"
import { InputGroup, Input } from "@chakra-ui/react"
import Card from "../components/Card"
import SearchIcon from "../utils/icons/SearchIcon"
import SuppliersTable from "../components/SuppliersTable"

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
        { id: 2, name: "Home Goods Inc.", contact: "Bob Smith", email: "bobsmi@gmail.com" , phone: "555-5678" },
        { id: 3, name: "Fashion Hub", contact: "Cathy Lee", email: "catlee@gmail.com" , phone: "555-8765" },
    ]
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
                >
                    <CrossIcon color="#FFFFFF" size="10" />
                    <FormSupplier />
                </DialogChakra>
            </div>
            <Card minHeight="min-h-auto">
                <InputGroup startElement={<SearchIcon color="#667085" size="20" />}>
                    <Input className="bg-[#FAFAFA]" placeholder="Search supplier by name" />
                </InputGroup>
            </Card>
            <Card>
                <h2 className="text-[26px] font-[500]">Supplier Database</h2>
                <SuppliersTable headers={headers} suppliers={suppliers}/>
            </Card>
        </div>
    )
}