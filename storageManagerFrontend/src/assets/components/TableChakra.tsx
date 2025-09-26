import { Table } from "@chakra-ui/react"
import ClearButton from "./ClearButton"
import EditButton from "./EditButton"

export default function TableChakra ({headers, products}: {headers: string[]}) {
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
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>{product.stock}</Table.Cell>
                        <Table.Cell>{product.status}</Table.Cell>
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