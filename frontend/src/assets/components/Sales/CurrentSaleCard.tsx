// Action button and line item components
import TrashButton from "../TrashButton"
import SaleLineItem from "./SaleLineItem"

// Context hook for selected products state
import { useSelectedProducts } from "../../contexts/SelectedProductsContext"
import type { Product } from "@/types/product"

// Type guard function to check if product has amount property
function hasAmount(p: Product): p is Product & { amount: number } {
  return typeof p.amount === "number" && p.amount > 0
}

/**
 * Current sale card component for displaying items in the shopping cart
 * Shows selected products with quantities and provides clear cart functionality
 * Integrates with selected products context for cart state management
 */
export default function CurrentSaleCard() {
  // Context hook for managing selected products in cart
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();

  // Filter products that have a valid amount (quantity > 0)
  const items = selectedProducts.filter(hasAmount);

  return (
    <div>
      {/* Header with title and clear button */}
      <div className="flex justify-between items-center">
        <span className="text-[25px] font-[500]">Current Sale</span>
        {selectedProducts.length > 0 ?
          <div onClick={() => setSelectedProducts([])}>
            <TrashButton text="Clear" />
          </div>
          : null
        }
      </div>

      {/* Empty state when no items in cart */}
      {items.length === 0 ? (
        <div className="h-[5rem] flex items-center justify-center">
          <span className="text-[#667085]">No items in sale</span>
        </div>
      ) : null}

      {/* List of selected products with quantities */}
      <div className="mt-[20px]">
        {items.map((item) => (
          <div className="mb-[10px]" key={item.id}>
            <SaleLineItem
              id={item.id ?? 0}
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