import { Button } from "@chakra-ui/react"
import CrossIcon from "../utils/icons/CrossIcon"
import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import TableChakra from "../components/TableChakra"

type CategoryValue = "all" | "electronics" | "clothing" | "homeAndGarden" | "sports";

type Option = {
  label: string;
  value: CategoryValue;
}

export default function Products() {
  const options: Option[] = [
    { label: "All Categories", value: "all" }, 
    { label: "Electronics", value: "electronics" }, 
    { label: "Clothing", value: "clothing" },
    { label: "Home & Garden", value: "homeAndGarden" },
    { label: "Sports", value: "sports" },
  ]

  const headers: string[] = [
    "Product",
    "Category",
    "Price",
    "Stock",
    "Status",
    "Actions",
  ]

  const products = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      price: 129.99,
      stock: 45,
      status: "In Stock",
    },
    {
      name: "Cotton T-Shirt",
      category: "Clothing",
      price: 24.99,
      stock: 120,
      status: "In Stock",
    },
    {
      name: "Coffee Maker",
      category: "Home & Garden",
      price: 89.99,
      stock: 12,
      status: "Medium",
    },

  ]

  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-[700]">Products</h1>
          <span className="text-[#667085]">Manage your store inventory</span>
        </div>
        <Button className="bg-[#5CE18C]">
          <CrossIcon color="#FFFFFF" size="10" />
          <span>Add Product</span>
        </Button>
      </div>
      <Card minHeight="min-h-auto">
        <div className="grid grid-cols-[4fr_1fr] gap-[1rem]">
          <InputGroup startElement={<SearchIcon color="#667085" size="20"/>}>
            <Input className="bg-[#FAFAFA]" placeholder="Search products..." />
          </InputGroup>
          <SelectChakra array={options}/>
        </div>
      </Card>
      <Card>
        <h2 className="text-[26px] font-[500]">Product Invetory</h2>
        <TableChakra products={products} headers={headers}/>
      </Card>
    </div>
  )
}