// UI components for sales interface
import Card from "../components/Card"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsCard from "../components/Sales/ProductsCard"
import ProductCard from "../components/Sales/ProductCard"
import CurrentSaleCard from "../components/Sales/CurrentSaleCard"
import PaymentCard from "../components/Sales/PaymentCard"

// Context for managing selected products in cart
import { useSelectedProducts } from "../contexts/SelectedProductsContext"

// React hooks for state management
import { useEffect, useState } from "react"

// HTTP client for API communication
import axios from "axios"

// Type definitions for products and categories
import type { Category, Product } from "@/types/product"

/**
 * Sales page component implementing a Point of Sale (POS) system
 * Provides product selection, cart management, and payment processing interface
 */
export default function Sales() {
  // Context for managing selected products in the shopping cart
  const { setSelectedProducts } = useSelectedProducts()

  // State for categories and products data
  const [categories, setCategories] = useState<Category[]>([])
  const [data, setData] = useState<Product[]>()

  // Fetch products and categories data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchProducts, fetchCategories] = await Promise.all([
          axios.get("http://localhost:3000/products/"),
          axios.get("http://localhost:3000/categories/")
        ])
        setData(fetchProducts.data)
        setCategories(fetchCategories.data)
      } catch (error) {
        console.log("Error fetching data", error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      {/* Page header with sales icon and title */}
      <div className="flex gap-[10px] items-center">
        <SalesIcon color="#4ADE80" size="25" />
        <h1 className="text-[30px] font-[700]">Sales - POS System</h1>
      </div>

      {/* Main sales interface with product grid and cart */}
      <div className="grid grid-cols-[4fr_2fr] gap-[1.5rem]">
        {/* Product selection area */}
        <div>
          <Card>
            <ProductsCard>
              {
                data ? (
                  data.map((item) => (
                    <div key={item.id}
                      onClick={() => {
                        // Add product to cart or increment quantity if already exists
                        setSelectedProducts(prev => {
                          const idx = prev.findIndex(p => p.id === item.id);
                          if (idx === -1) {
                            return [...prev, { ...item, amount: 1 }];
                          }
                          const updated = { ...prev[idx], amount: (prev[idx].amount ?? 0) + 1 };
                          return prev.map(p => p.id === item.id ? updated : p);
                        });
                      }}
                    >
                      <ProductCard
                        name={item.name}
                        category={categories.find(((category) => category.id === item.categoryId))?.name || "Unknown"}
                        price={item.price}
                        stock={item.stock}
                      />
                    </div>
                  ))) : <></>}
            </ProductsCard>
          </Card>
        </div>

        {/* Cart and payment area */}
        <div className="flex flex-col gap-[0.1rem]">
          <Card>
            <CurrentSaleCard />
          </Card>
          <Card>
            <PaymentCard />
          </Card>
        </div>
      </div>
    </div>
  )
}