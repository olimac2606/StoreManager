// UI components for layout and form handling
import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import ProductsTable from "../components/Products/ProductsTable"

// React hooks for state management and side effects
import { useState, useMemo, useEffect } from "react"

// Type definitions for product management
import type { ProductFormType, StatusValue, Product, Category } from "@/types/product"

// Context hooks for global state management
import { useEditingProduct } from "../contexts/EditingProductContext"
import { useCategories } from "../contexts/CategoriesContext"

// Dialog components for product and category management
import ProductDialog from "../components/Products/ProductDialog"
import CategoryDialog from "../components/Category/CategoryDialog"

// Custom Hooks for http requests
import { useFetch } from "@/hooks/useFetch"
import { usePost } from "@/hooks/usePost"
import { useDelete } from "@/hooks/useDelete"
import { usePatch } from "@/hooks/usePatch"

/**
 * Products page component for managing store inventory
 * Provides CRUD operations for products with search, filter, and category management
 */
export default function Products() {
  // Table column headers for product display
  const headers: string[] = [
    "Product",
    "Category",
    "Price",
    "Stock",
    "Status",
    "Actions",
  ]

  // State management for products and categories
  const { categories, setCategories } = useCategories()

  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState<string>("0")
  const [inputValue, setInputValue] = useState("")

  //useState for saving products on frontend
  const [products, setProducts] = useState<Product[]>([])

  // API operation state for async operations
  const [onPost, setOnPost] = useState<Product | undefined>(undefined)
  const [onPatch, setOnPatch] = useState<Product | undefined>(undefined)
  const [onDeleteProduct, setOnDeleteProduct] = useState<number>(0)

  //Hook Fetch initial data for products
  const { data: fethcProducts } = useFetch<Product[]>("products")
  useEffect(() => {
    if (fethcProducts) {
      setProducts(fethcProducts)
    }
  }, [fethcProducts])

  //Hook Fetch initial data for categories
  const { data: fetchCategories } = useFetch<Category[] | null>("categories")
  useEffect(() => {
    if (fetchCategories) {
      setCategories(fetchCategories)
    }
  }, [fetchCategories])

  //Active hook useDelete when onDeleteProduct change 
  const { data: deleteAffected, deleteTrigger } = useDelete("products", "Product", onDeleteProduct)
  useEffect(() => {
    if (deleteAffected === undefined) return
    if (deleteAffected && deleteAffected > 0) {
      setProducts((prev) => prev.filter((product) => product.id !== onDeleteProduct))
    }
  }, [deleteTrigger])

  //Active hook usePost when onPost change 
  const { data: product } = usePost("products", "Product", onPost)
  useEffect(() => {
    if (product) {
      setProducts((prev) => [product, ...prev])
    }
  }, [product])

  //Active hook useDelete when onDeleteProduct change 
  const { data: patchAffected, patchTrigger } = usePatch("products", "Product", onPatch, onPatch?.id)
  useEffect(() => {
    if (patchAffected === undefined) return
    if (patchAffected && patchAffected > 0) {
      if (patchAffected && patchAffected > 0 && onPatch) {
        setProducts((prev) => {
          const index = prev.findIndex((product) => product.id === onPatch.id)
          if (index === -1) return prev
          return [...prev.slice(0, index), onPatch, ...prev.slice(index + 1)]
        })
      }
    }
  }, [patchTrigger])

  // Context for editing product state
  const { editingProduct } = useEditingProduct()

  // Handle product form submission with automatic status calculation
  const handleForm = (formData: ProductFormType) => {
    // Calculate product status based on stock levels
    let statusValue: StatusValue
    if (formData.stock > 20) {
      statusValue = "In Stock"
    } else if (formData.stock > 5) {
      statusValue = "Medium"
    } else {
      statusValue = "Low Stock"
    }

    const newProduct: Product = {
      id: formData.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      stock: formData.stock,
      status: statusValue,
    }

    // Determine if this is an update or create operation
    if (editingProduct !== null) {
      setOnPatch(newProduct)
      return
    }
    setOnPost(newProduct)
  }

  // Handle category filter selection
  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value)
  }

  // Handle search input with case-insensitive filtering
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase())
  }

  // Filter products based on search term and category selection
  const filteredProducts = useMemo(() => {
    if (!products) return []; //Verify if products get an array
    const input = inputValue.trim().toLowerCase()
    return products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(input)
      const matchesCategory = selectedCategory === "0" ? true : product.categoryId === Number(selectedCategory)
      return matchesName && matchesCategory
    })
  }, [products, inputValue, selectedCategory])

  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      {/* Page header with title and action buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-[700]">Products</h1>
          <span className="text-[#667085]">Manage your store inventory</span>
        </div>
        <div className="flex gap-[1rem]">
          <ProductDialog handleForm={handleForm} />
          <CategoryDialog />
        </div>
      </div>

      {/* Search and filter controls */}
      <Card minHeight="min-h-auto">
        <div className="grid grid-cols-[4fr_1fr] gap-[1rem]">
          <InputGroup startElement={<SearchIcon color="#667085" size="20" />}>
            <Input
              onChange={handleInput}
              className="bg-[#FAFAFA]"
              placeholder="Search products..."
            />
          </InputGroup>
          <SelectChakra
            onChangeCategory={handleChangeCategory}
            option={[{ id: 0, name: "All" }, ...categories]}
            defaultValue={"0"}
          />
        </div>
      </Card>

      {/* Product inventory table */}
      <Card>
        <h2 className="text-[26px] font-[500]">Product Inventory</h2>
        <ProductsTable products={filteredProducts} headers={headers} onDelete={(idProduct) => setOnDeleteProduct(idProduct)} />
      </Card>
    </div>
  )
}
