import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import ProductsTable from "../components/Products/ProductsTable"
import { useState, useMemo, useEffect } from "react"
import type { ProductFormType, StatusValue, Product } from "@/types/product"
import { useEditingProduct } from "../contexts/EditingProductContext"
import axios from "axios"
import { useCategories } from "../contexts/CategoriesContext"
import ProductDialog from "../components/Products/ProductDialog"
import CategoryDialog from "../components/Category/CategoryDialog"
import { toaster } from "@/components/ui/toaster"

export default function Products() {

  const headers: string[] = [
    "Product",
    "Category",
    "Price",
    "Stock",
    "Status",
    "Actions",
  ]

  const [products, setProducts] = useState<Product[]>([])
  const { categories, setCategories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>("0")
  const [inputValue, setInputValue] = useState("")
  const [onPost, setOnPost] = useState<Product | undefined>(undefined)
  const [onPatch, setOnPatch] = useState<Product | undefined>(undefined)
  const [onDeleteProduct, setOnDeleteProduct] = useState<number>(0)

  const { editingProduct } = useEditingProduct()

  const handleForm = (formData: ProductFormType) => {
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

    if (editingProduct !== null) {
      setOnPatch(newProduct)
      return
    }
    setOnPost(newProduct)
  }

  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim().toLowerCase())
  }

  const filteredProducts = useMemo(() => {
    const input = inputValue.trim().toLowerCase()

    return products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(input)
      const matchesCategory = selectedCategory === "0" ? true : product.categoryId === Number(selectedCategory)
      return matchesName && matchesCategory
    })
  }, [products, inputValue, selectedCategory])

  const onDelete = (idProduct: number) => {
    setOnDeleteProduct(idProduct)
  }

  useEffect(() => {
    if (!onDeleteProduct) return
    const deleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:3000/products/${onDeleteProduct}`)
        toaster.create({
          description: "Product delete succesfully",
          type: "warning"
        })
      } catch (error) {
        console.log("Error deleting product", error)
        toaster.create({
          description: "There was an error deleting product",
          type: "error"
        })
      }
    }

    deleteProduct()
  }, [onDeleteProduct])

  useEffect(() => {
    if (!onPatch) return

    const patchProduct = async () => {
      try {
        await axios.patch(`http://localhost:3000/products/${onPatch.id}`, onPatch)
        toaster.create({
          description: "Product updated succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error updating product", error)
        toaster.create({
          description: "There was an error updating product",
          type: "error"
        })
      }
    }

    patchProduct()

  }, [onPatch])

  useEffect(() => {
    if (!onPost) return

    const postProduct = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/products/`, onPost)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        toaster.create({
          description: "Product created succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error creating product", error)
        toaster.create({
          description: "There was an error creating product",
          type: "error"
        })
      }
    }

    postProduct()

  }, [onPost])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:3000/products/"),
          axios.get("http://localhost:3000/categories/"),
        ])
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [products, categories])

  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
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

      <Card>
        <h2 className="text-[26px] font-[500]">Product Inventory</h2>
        <ProductsTable products={filteredProducts} headers={headers} onDelete={onDelete} />
      </Card>
    </div>
  )
}
