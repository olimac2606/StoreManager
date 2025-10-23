// Chakra UI Table components for data display
import { Table } from "@chakra-ui/react"

// Action button components
import TrashButton from "../TrashButton";
import EditButton from "../EditButton";

// Type definitions and context hooks
import type { Product } from "@/types/product";
import { useEditingProduct } from "@/assets/contexts/EditingProductContext";
import { useCategories } from "@/assets/contexts/CategoriesContext";
import DeleteDialog from "../DeleteDialog";

// Type definition for products table props
type Props = {
  headers: string[],
  products: Product[],
  onDelete: (idProduct: number) => void
}

/**
 * Products table component for displaying product data in a structured table
 * Shows product information with edit and delete actions
 * Props:
 *   - headers: array of column header strings
 *   - products: array of Product objects to display
 *   - onDelete: callback function for product deletion
 */
export default function ProductsTable({ headers, products, onDelete }: Props) {

  // Context hooks for categories and editing state
  const { categories } = useCategories()
  const { setEditingProduct } = useEditingProduct()

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
      {/* Table body with product data rows */}
      <Table.Body>
        {products.map((product, i) => (
          <Table.Row key={i}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{categories.find(((category) => category.id === product.categoryId))?.name}</Table.Cell>
            <Table.Cell>${product.price}</Table.Cell>
            <Table.Cell>{product.stock}</Table.Cell>
            {/* Status badge with color coding based on stock level */}
            <Table.Cell>
              <div className={`${product.status === "In Stock" ? "bg-[#4ADE80]" : product.status === "Medium" ? "bg-[#C1C70A]" : product.status === "Low Stock" ? "bg-[#EF4444]" : ""} py-[2px] px-[12px] text-[#FFFFFF] rounded-[50px] w-fit text-center`}>
                <span>{product.status}</span>
              </div>
            </Table.Cell>
            {/* Action buttons for edit and delete */}
            <Table.Cell>
              <div className="flex gap-[10px]">
                <div onClick={() => setEditingProduct(product)}>
                  <EditButton />
                </div>
                <DeleteDialog itemName={product.name} onDelete={onDelete} idItem={product.id ? product.id : 0}>
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