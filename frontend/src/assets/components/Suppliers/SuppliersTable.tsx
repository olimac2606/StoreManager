// Chakra UI Table components for data display
import { Table } from "@chakra-ui/react"

// Action button components
import TrashButton from "../TrashButton"
import EditButton from "../EditButton"

// Context hook and type definitions
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext"
import type { Supplier } from "@/types/suppliers"
import DeleteDialog from "../DeleteDialog"

// Type definition for suppliers table props
type Props = {
  headers: string[],
  suppliers: Supplier[],
  onDelete: (id: number) => void,
}

/**
 * Suppliers table component for displaying supplier data in a structured table
 * Shows supplier information with edit and delete actions
 * Props:
 *   - headers: array of column header strings
 *   - suppliers: array of Supplier objects to display
 *   - onDelete: callback function for supplier deletion
 */
export default function SuppliersTable({ headers, suppliers, onDelete }: Props) {

  // Context hook for editing supplier state
  const { setEditingSupplier } = useEditingSupplier()
  
  return (
    <Table.Root>
      <Table.Caption />
      {/* Table header with column titles */}
      <Table.Header>
        <Table.Row>
          {headers.map((header, i) => (
            <Table.ColumnHeader key={i}>{header}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      {/* Table body with supplier data rows */}
      <Table.Body>
        {suppliers.map((supplier, i) => (
          <Table.Row key={i}>
            <Table.Cell>{supplier.companyName}</Table.Cell>
            <Table.Cell>{supplier.contactName}</Table.Cell>
            <Table.Cell>{supplier.email}</Table.Cell>
            <Table.Cell>{supplier.phone}</Table.Cell>
            {/* Action buttons for edit and delete */}
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