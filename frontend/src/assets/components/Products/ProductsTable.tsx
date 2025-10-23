import { Table } from "@chakra-ui/react"
import TrashButton from "../TrashButton";
import EditButton from "../EditButton";
import type { Product } from "@/types/product";
import { useEditingProduct } from "@/assets/contexts/EditingProductContext";
import { useCategories } from "@/assets/contexts/CategoriesContext";
import DeleteDialog from "../DeleteDialog";

type Props = {
  headers: string[],
  products: Product[],
  onDelete: (idProduct: number) => void
}

export default function ProductsTable({ headers, products, onDelete }: Props) {

  const { categories } = useCategories()

  const { setEditingProduct } = useEditingProduct()

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
        {products.map((product, i) => (
          <Table.Row key={i}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{categories.find(((category) => category.id === product.categoryId))?.name}</Table.Cell>
            <Table.Cell>${product.price}</Table.Cell>
            <Table.Cell>{product.stock}</Table.Cell>
            <Table.Cell>
              <div className={`${product.status === "In Stock" ? "bg-[#4ADE80]" : product.status === "Medium" ? "bg-[#C1C70A]" : product.status === "Low Stock" ? "bg-[#EF4444]" : ""} py-[2px] px-[12px] text-[#FFFFFF] rounded-[50px] w-fit text-center`}>
                <span>{product.status}</span>
              </div>
            </Table.Cell>
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