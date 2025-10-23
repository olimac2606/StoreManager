import TrashButton from "../TrashButton"
import SaleLineItem from "./SaleLineItem"
import { useSelectedProducts } from "../../contexts/SelectedProductsContext"
import type { Product } from "@/types/product"

function hasAmount(p: Product): p is Product & { amount: number } {
  return typeof p.amount === "number" && p.amount > 0
}

export default function CurrentSaleCard() {
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();
  const items = selectedProducts.filter(hasAmount);
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-[25px] font-[500]">Current Sale</span>
        {selectedProducts.length > 0 ?
          <div onClick={() => setSelectedProducts([])}>
            <TrashButton text="Clear" />
          </div>
          : null
        }
      </div>
      {items.length === 0 ? (
        <div className="h-[5rem] flex items-center justify-center">
          <span className="text-[#667085]">No items in sale</span>
        </div>
      ) : null}
      <div className="mt-[20px]">
        {items.map((item) => (
          <div className="mb-[10px]" key={item.id}>
            <SaleLineItem
              id={item.id}
              productName={item.name}
              price={item.price}
              amount={item.amount}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 