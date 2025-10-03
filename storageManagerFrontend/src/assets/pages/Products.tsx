import CrossIcon from "../utils/icons/CrossIcon"
import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import ProductsTable from "../components/ProductsTable"
import { useState, useMemo } from "react"
import DialogChakra from "../components/DialogChakra"
import ProductForm from "../components/ProductForm"
import type { CategoryValue, Option, ProductForm, ProductCategory, StatusValue, Product } from "@/types/product"
import { useEditingProduct } from "../contexts/EditingProductContext"

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

  const [products, setProducts] = useState<Product[]>(
    [
      { "id": 1, "name": "Wireless Headphones", "category": "Electronics", "price": 129.99, "stock": 45, "status": "In Stock" },
      { "id": 2, "name": "Cotton T-Shirt", "category": "Clothing", "price": 24.99, "stock": 120, "status": "In Stock" },
      { "id": 3, "name": "Coffee Maker", "category": "Home & Garden", "price": 89.99, "stock": 12, "status": "Medium" },
      { "id": 4, "name": "Running Shoes", "category": "Sports", "price": 159.99, "stock": 3, "status": "Low Stock" },

      { "id": 5, "name": "Bluetooth Speaker", "category": "Electronics", "price": 79.99, "stock": 56, "status": "In Stock" },
      { "id": 6, "name": "4K Monitor 27\"", "category": "Electronics", "price": 329.0, "stock": 18, "status": "Medium" },
      { "id": 7, "name": "Smartwatch Series X", "category": "Electronics", "price": 219.0, "stock": 6, "status": "Medium" },
      { "id": 8, "name": "USB-C Hub 7-in-1", "category": "Electronics", "price": 39.99, "stock": 95, "status": "In Stock" },
      { "id": 9, "name": "Noise-Canceling Earbuds", "category": "Electronics", "price": 99.99, "stock": 4, "status": "Low Stock" },

      { "id": 10, "name": "Slim Fit Jeans", "category": "Clothing", "price": 49.99, "stock": 80, "status": "In Stock" },
      { "id": 11, "name": "Classic Hoodie", "category": "Clothing", "price": 39.99, "stock": 22, "status": "In Stock" },
      { "id": 12, "name": "Leather Belt", "category": "Clothing", "price": 19.99, "stock": 15, "status": "Medium" },
      { "id": 13, "name": "Sneakers Lifestyle", "category": "Clothing", "price": 69.99, "stock": 7, "status": "Medium" },
      { "id": 14, "name": "Summer Dress", "category": "Clothing", "price": 44.5, "stock": 5, "status": "Low Stock" },

      { "id": 15, "name": "Air Fryer XL", "category": "Home & Garden", "price": 149.99, "stock": 25, "status": "In Stock" },
      { "id": 16, "name": "Vacuum Cleaner Pro", "category": "Home & Garden", "price": 189.99, "stock": 9, "status": "Medium" },
      { "id": 17, "name": "Memory Foam Pillow", "category": "Home & Garden", "price": 29.99, "stock": 70, "status": "In Stock" },
      { "id": 18, "name": "Ceramic Cookware Set", "category": "Home & Garden", "price": 129.0, "stock": 14, "status": "Medium" },
      { "id": 19, "name": "LED Floor Lamp", "category": "Home & Garden", "price": 59.99, "stock": 6, "status": "Medium" },
      { "id": 20, "name": "Bamboo Cutting Board", "category": "Home & Garden", "price": 24.0, "stock": 3, "status": "Low Stock" },

      { "id": 21, "name": "Yoga Mat Pro", "category": "Sports", "price": 39.99, "stock": 60, "status": "In Stock" },
      { "id": 22, "name": "Adjustable Dumbbells (Pair)", "category": "Sports", "price": 249.0, "stock": 11, "status": "Medium" },
      { "id": 23, "name": "Resistance Bands Set", "category": "Sports", "price": 29.99, "stock": 85, "status": "In Stock" },
      { "id": 24, "name": "Cycling Helmet", "category": "Sports", "price": 79.99, "stock": 8, "status": "Medium" },
      { "id": 25, "name": "Tennis Racket Graphite", "category": "Sports", "price": 139.0, "stock": 4, "status": "Low Stock" },
      { "id": 26, "name": "Soccer Ball Match", "category": "Sports", "price": 34.99, "stock": 33, "status": "In Stock" },

      { "id": 27, "name": "Electric Kettle", "category": "Home & Garden", "price": 39.99, "stock": 21, "status": "In Stock" },
      { "id": 28, "name": "Men's Polo Shirt", "category": "Clothing", "price": 27.99, "stock": 48, "status": "In Stock" },
      { "id": 29, "name": "Portable SSD 1TB", "category": "Electronics", "price": 119.0, "stock": 16, "status": "Medium" },
      { "id": 30, "name": "Gaming Mouse RGB", "category": "Electronics", "price": 49.99, "stock": 58, "status": "In Stock" },
      { "id": 31, "name": "Trail Running Jacket", "category": "Sports", "price": 99.99, "stock": 2, "status": "Low Stock" },
      { "id": 32, "name": "Velvet Throw Blanket", "category": "Home & Garden", "price": 54.99, "stock": 40, "status": "In Stock" }
    ]
  )
  const [category, setCategory] = useState<CategoryValue>("all")
  const [inputValue, setInputValue] = useState("")
  const categoryMap: Record<Exclude<CategoryValue, "all">, ProductCategory> = {
    electronics: "Electronics",
    clothing: "Clothing",
    homeAndGarden: "Home & Garden",
    sports: "Sports",
  };

  const handleForm = (formData: ProductForm) => {
    let statusValue: StatusValue
    if (formData.stock > 20) {
      statusValue = "In Stock"
    } else if (formData.stock > 5) {
      statusValue = "Medium"
    } else {
      statusValue = "Low Stock"
    }

    const unshiftToProducts: Product = {
      id: formData.id,
      name: formData.name,
      category: categoryMap[formData.category],
      price: formData.price,
      stock: formData.stock,
      status: statusValue,
    }
    
    if (editingProduct !== null) {
      if (editingProduct.id === unshiftToProducts.id) {
        setProducts(prev => prev.filter((product) => product.id !== editingProduct.id))
      }
    }
    setProducts(prev => [unshiftToProducts, ...prev])
  }

  const handleChangeCategory = (category: CategoryValue) => {
    setCategory(category);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase())
  }

  const filteredProducts = useMemo(() => {
    const input = inputValue.trim().toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().startsWith(input);

      const matchesCategory =
        category === "all"
          ? true
          : product.category === categoryMap[category];

      return matchesName && matchesCategory;
    });
  }, [products, inputValue, category]);

  const onDelete = (idProduct: number) => {
    setProducts(
      prev => prev.filter(product => product.id !== idProduct)
    )
  }

  const {editingProduct} = useEditingProduct()
  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-[700]">Products</h1>
          <span className="text-[#667085]">Manage your store inventory</span>
        </div>
        <DialogChakra
          buttonStyles="bg-[#5CE18C]"
          buttonText="Add Product"
          dialogTitle="Create Product"
          saveButtonStyles="bg-[#5CE18C]"
          formId="productForm"
        >
          <CrossIcon color="#FFFFFF" size="10" />
          <ProductForm handleForm={handleForm} currentProducts={products} />
        </DialogChakra>
      </div>
      <Card minHeight="min-h-auto">
        <div className="grid grid-cols-[4fr_1fr] gap-[1rem]">
          <InputGroup startElement={<SearchIcon color="#667085" size="20" />}>
            <Input onChange={handleInput} className="bg-[#FAFAFA]" placeholder="Search products..." />
          </InputGroup>
          <SelectChakra onChangeCategory={handleChangeCategory} option={options} />
        </div>
      </Card>
      <Card>
        <h2 className="text-[26px] font-[500]">Product Invetory</h2>
        <ProductsTable products={filteredProducts} headers={headers} onDelete={onDelete} />
      </Card>
    </div>
  )
}