import { Table } from "@chakra-ui/react"
import ClearButton from "./ClearButton"
import EditButton from "./EditButton"

export type ProductCategory = "Electronics" | "Clothing" | "Home & Garden" | "Sports";
export type statusValue = "In Stock" | "Medium" | "Low Stock"

export type Product = {
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: statusValue;
}

export default function TableChakra ({headers, products}: {headers: string[], products: Product[]}) {
    return (
        <Table.Root>
            <Table.Caption />
            <Table.Header>
                <Table.Row>
                {headers.map((header, i) => (
                    <Table.ColumnHeader  key={i}>{header}</Table.ColumnHeader>
                ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {products.map((product, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.category}</Table.Cell>
                        <Table.Cell>${product.price}</Table.Cell>
                        <Table.Cell>{product.stock}</Table.Cell>
                        <Table.Cell>
                            <div className={`${product.status === "In Stock" ? "bg-[#4ADE80]" : product.status === "Medium" ? "bg-[#C1C70A]" : product.status === "Low Stock" ? "bg-[#EF4444]" : ""} py-[2px] px-[12px] text-[#FFFFFF] rounded-[50px] w-fit text-center`}>
                                <span>{product.status}</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex gap-[10px]">
                                <EditButton />
                                <ClearButton />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
                
            </Table.Body>
        </Table.Root>
    )
}