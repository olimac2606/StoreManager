import { Table } from "@chakra-ui/react"
import TrashButton from "../TrashButton"
import EditButton from "../EditButton"
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext"
import type { Supplier } from "@/types/suppliers"
import DeleteDialog from "../DeleteDialog"


type Props = {
  headers: string[],
  suppliers: Supplier[],
  onDelete: (id: number) => void,
}

export default function SuppliersTable({ headers, suppliers, onDelete }: Props) {

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
            <Table.Cell>{supplier.companyName}</Table.Cell>
            <Table.Cell>{supplier.contactName}</Table.Cell>
            <Table.Cell>{supplier.email}</Table.Cell>
            <Table.Cell>{supplier.phone}</Table.Cell>
            <Table.Cell>
              <div className="flex gap-[10px]">
                <div onClick={() => setEditingSupplier(supplier)}>
                  <EditButton />
                </div>
                <DeleteDialog onDelete={onDelete} idItem={supplier.id} itemName={`${supplier.companyName} (${supplier.contactName})`}>
                  <span>
                    <TrashButton />
                  </span>
                </DeleteDialog>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>
    </Table.Root>
  )
}