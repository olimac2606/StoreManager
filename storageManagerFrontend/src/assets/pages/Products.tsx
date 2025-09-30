import { Button } from "@chakra-ui/react"
import CrossIcon from "../utils/icons/CrossIcon"
import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import TableChakra from "../components/TableChakra"
import { useState, useMemo } from "react"

type CategoryValue = "all" | "electronics" | "clothing" | "homeAndGarden" | "sports";
type ProductCategory = "Electronics" | "Clothing" | "Home & Garden" | "Sports";
type statusValue = "In Stock" | "Medium" | "Low Stock"

type Option = {
  label: string;
  value: CategoryValue;
}

type Product = {
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: statusValue;
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

  const products: Product[] = [
    { name: "Wireless Headphones", category: "Electronics", price: 129.99, stock: 45, status: "In Stock" },
    { name: "Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 120, status: "In Stock" },
    { name: "Coffee Maker", category: "Home & Garden", price: 89.99, stock: 12, status: "Medium" },
    { name: "Running Shoes", category: "Sports", price: 159.99, stock: 3, status: "Low Stock" },

    { name: "Bluetooth Speaker", category: "Electronics", price: 79.99, stock: 56, status: "In Stock" },
    { name: "4K Monitor 27\"", category: "Electronics", price: 329.0, stock: 18, status: "Medium" },
    { name: "Smartwatch Series X", category: "Electronics", price: 219.0, stock: 6, status: "Medium" },
    { name: "USB-C Hub 7-in-1", category: "Electronics", price: 39.99, stock: 95, status: "In Stock" },
    { name: "Noise-Canceling Earbuds", category: "Electronics", price: 99.99, stock: 4, status: "Low Stock" },

    { name: "Slim Fit Jeans", category: "Clothing", price: 49.99, stock: 80, status: "In Stock" },
    { name: "Classic Hoodie", category: "Clothing", price: 39.99, stock: 22, status: "In Stock" },
    { name: "Leather Belt", category: "Clothing", price: 19.99, stock: 15, status: "Medium" },
    { name: "Sneakers Lifestyle", category: "Clothing", price: 69.99, stock: 7, status: "Medium" },
    { name: "Summer Dress", category: "Clothing", price: 44.5, stock: 5, status: "Low Stock" },

    { name: "Air Fryer XL", category: "Home & Garden", price: 149.99, stock: 25, status: "In Stock" },
    { name: "Vacuum Cleaner Pro", category: "Home & Garden", price: 189.99, stock: 9, status: "Medium" },
    { name: "Memory Foam Pillow", category: "Home & Garden", price: 29.99, stock: 70, status: "In Stock" },
    { name: "Ceramic Cookware Set", category: "Home & Garden", price: 129.0, stock: 14, status: "Medium" },
    { name: "LED Floor Lamp", category: "Home & Garden", price: 59.99, stock: 6, status: "Medium" },
    { name: "Bamboo Cutting Board", category: "Home & Garden", price: 24.0, stock: 3, status: "Low Stock" },

    { name: "Yoga Mat Pro", category: "Sports", price: 39.99, stock: 60, status: "In Stock" },
    { name: "Adjustable Dumbbells (Pair)", category: "Sports", price: 249.0, stock: 11, status: "Medium" },
    { name: "Resistance Bands Set", category: "Sports", price: 29.99, stock: 85, status: "In Stock" },
    { name: "Cycling Helmet", category: "Sports", price: 79.99, stock: 8, status: "Medium" },
    { name: "Tennis Racket Graphite", category: "Sports", price: 139.0, stock: 4, status: "Low Stock" },
    { name: "Soccer Ball Match", category: "Sports", price: 34.99, stock: 33, status: "In Stock" },

    { name: "Electric Kettle", category: "Home & Garden", price: 39.99, stock: 21, status: "In Stock" },
    { name: "Men's Polo Shirt", category: "Clothing", price: 27.99, stock: 48, status: "In Stock" },
    { name: "Portable SSD 1TB", category: "Electronics", price: 119.0, stock: 16, status: "Medium" },
    { name: "Gaming Mouse RGB", category: "Electronics", price: 49.99, stock: 58, status: "In Stock" },
    { name: "Trail Running Jacket", category: "Sports", price: 99.99, stock: 2, status: "Low Stock" },
    { name: "Velvet Throw Blanket", category: "Home & Garden", price: 54.99, stock: 40, status: "In Stock" }
  ]
  const [category, setCategory] = useState("all")
  const [inputValue, setInputValue] = useState("")

  const categoryMap: Record<CategoryValue, ProductCategory | "all"> = {
    all: "all",
    electronics: "Electronics",
    clothing: "Clothing",
    homeAndGarden: "Home & Garden",
    sports: "Sports",
  };

  const handleChangeCategory = (category: CategoryValue) => {
    setCategory(categoryMap[category]);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase())
  }

  const filteredProducts = useMemo(() => {
    const input = inputValue.trim().toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().startsWith(input);
      console.log(matchesName)
      console.log(product.name)
      console.log(input)
      const matchesCategory = category === "all" || product.category === category;
      return matchesName && matchesCategory;
    });
  }, [products, inputValue, category]);

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
          <InputGroup startElement={<SearchIcon color="#667085" size="20" />}>
            <Input onChange={handleInput} className="bg-[#FAFAFA]" placeholder="Search products..." />
          </InputGroup>
          <SelectChakra onChangeCategory={handleChangeCategory} array={options} />
        </div>
      </Card>
      <Card>
        <h2 className="text-[26px] font-[500]">Product Invetory</h2>
        <TableChakra products={filteredProducts} headers={headers} />
      </Card>
    </div>
  )
}