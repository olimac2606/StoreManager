import Card from "../components/Card"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsCard from "../components/Sales/ProductsCard"
import ProductCard from "../components/Sales/ProductCard"
import CurrentSaleCard from "../components/Sales/CurrentSaleCard"
import PaymentCard from "../components/Sales/PaymentCard"
import { useSelectedProducts } from "../contexts/SelectedProductsContext"
import { useEffect, useState } from "react"
import axios from "axios"
import type { Category, Product } from "@/types/product"

export default function Sales() {
  const { setSelectedProducts } = useSelectedProducts()
  const [categories, setCategories] = useState<Category[]>()
  const [data, setData] = useState<Product[]>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchProducts, fetchCategories] = await Promise.all([
          axios.get("http://localhost:3000/products/"),
          axios.get("http://localhost:3000/categories/")
        ])
        setData(fetchProducts.data)
        setCategories(fetchCategories.data)
        console.log(fetchCategories)
      } catch (error) {
        console.log("Error fetching data", error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      <div className="flex gap-[10px] items-center">
        <SalesIcon color="#4ADE80" size="25" />
        <h1 className="text-[30px] font-[700]">Sales - POS System</h1>
      </div>
      <div className="grid grid-cols-[4fr_2fr] gap-[1.5rem]">
        <div>
          <Card>
            <ProductsCard>
              {
                data ? (
                  data.map((item) => (
                    <div key={item.id}
                      onClick={() => {
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
                        category={categories.find(((category) => category.id === item.categoryId))?.name}
                        price={item.price}
                        stock={item.stock}
                      />
                    </div>
                  ))) : <></>}
            </ProductsCard>
          </Card>
        </div>
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