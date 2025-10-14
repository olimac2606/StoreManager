import CrossIcon from "../utils/icons/CrossIcon"
import Card from "../components/Card"
import { Input, InputGroup } from "@chakra-ui/react"
import SearchIcon from "../utils/icons/SearchIcon"
import SelectChakra from "../components/SelectChakra"
import ProductsTable from "../components/Products/ProductsTable"
import { useState, useMemo, useEffect } from "react"
import DialogChakra from "../components/DialogChakra"
import ProductForm from "../components/Products/ProductForm"
import type { CategoryValue, Option, ProductFormType, ProductCategory, StatusValue, Product } from "@/types/product"
import { useEditingProduct } from "../contexts/EditingProductContext"
import axios from "axios"

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

  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<CategoryValue>("all")
  const [inputValue, setInputValue] = useState("")
  const [onPost, setOnPost] = useState<Product | undefined>(undefined)
  const [onPatch, setOnPatch] = useState<Product | undefined>(undefined)
  const [onDeleteProduct, setOnDeleteProduct] = useState<number>(0)
  const categoryMap: Record<Exclude<CategoryValue, "all">, ProductCategory> = {
    electronics: "Electronics",
    clothing: "Clothing",
    homeAndGarden: "Home & Garden",
    sports: "Sports",
  };

  const handleForm = (formData: ProductFormType) => {
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
        setProducts(prev => [unshiftToProducts, ...prev])
        setOnPatch(unshiftToProducts)
        return
      }
    }
    setOnPost(unshiftToProducts)
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
    setOnDeleteProduct(idProduct)
  }

  const { editingProduct } = useEditingProduct()

  useEffect(() => {
    if (onDeleteProduct === 0) return

    const deleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:3000/products/${onDeleteProduct}`)
      } catch (error) {
        console.log("Error deleting product", error)
      }
    }

    deleteProduct()
  }, [onDeleteProduct])

  useEffect(() => {
    if (!onPatch) return
    const patchProducts = async () => {
      try {
        await axios.patch(`http://localhost:3000/products/${onPatch?.id}`, onPatch)
      } catch (error) {
        console.log("Error updating product", error)
      }
    }
    patchProducts()
  }, [onPatch])

  useEffect(() => {
    if (!onPost) return
    const postProducts = async () => {
      try {
        await axios.post(`http://localhost:3000/products/`, onPost)
      } catch (error) {
        console.log("Error creating product", error)
      }
    }
    postProducts()
  }, [onPost])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products/")
        setProducts(res.data)
      } catch (error) {
        console.log("Error getting the products", error)
      }
    }

    fetchProducts()
  }, [])
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