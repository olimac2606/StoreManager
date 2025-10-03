import { Table } from "@chakra-ui/react"
import ClearButton from "./ClearButton"
import EditButton from "./EditButton"
import { useEditingSupplier } from "../contexts/EditingSupplierContext"

type Supplier = {
    id: number;
    name: string;
    contact: string;
    email: string;
    phone: string;
}

type Props = {
    headers: string[],
    suppliers: Supplier[],
    onDelete: (id: number) => void,
}

export default function SuppliersTable ({ headers, suppliers, onDelete}: Props) {
    
    const { setEditingSupplier } = useEditingSupplier()
    return (
        <Table.Root>
        <Table.Caption />
        <Table.Header>
            <Table.Row>
                {headers.map((header, i) => (
                    <Table.ColumnHeader key={i}>{header}</Table.ColumnHeader>
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {suppliers.map((supplier, i) => (
                <Table.Row key={i}>
                    <Table.Cell>{supplier.name}</Table.Cell>
                    <Table.Cell>{supplier.contact}</Table.Cell>
                    <Table.Cell>{supplier.email}</Table.Cell>
                    <Table.Cell>{supplier.phone}</Table.Cell>
                    <Table.Cell>
                        <div className="flex gap-[10px]">
                            <div onClick={() => setEditingSupplier(supplier)}>
                                <EditButton />
                            </div>
                            <div onClick={() => onDelete(supplier.id)}>
                                <ClearButton />
                            </div>
                        </div>
                    </Table.Cell>
                </Table.Row>
            ))}

        </Table.Body>
    </Table.Root>
    )
}