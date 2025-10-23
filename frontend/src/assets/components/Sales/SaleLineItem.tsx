// Chakra UI Button component for actions
import { Button } from "@chakra-ui/react"

// Icon components for quantity controls
import CrossIcon from "@/assets/utils/icons/CrossIcon"
import MinusIcon from "@/assets/utils/icons/MinusIcon"
import TrashIcon from "@/assets/utils/icons/TrashIcon"

// Context hook for selected products state management
import { useSelectedProducts } from "@/assets/contexts/SelectedProductsContext"

/**
 * Sale line item component for displaying individual products in the cart
 * Provides quantity controls (increment, decrement, remove) for each cart item
 * Props:
 *   - productName: name of the product to display
 *   - price: unit price of the product
 *   - amount: current quantity in cart
 *   - id: unique identifier for the product
 */
export default function SaleLineItem({ productName, price, amount, id }: { productName: string, price: number, amount: number, id: number }) {
    // Context hook for managing selected products
    const { setSelectedProducts } = useSelectedProducts()
    
    // Decrement quantity (prevents negative values)
    const decrement = () => {
        setSelectedProducts(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, amount: Math.max(0, (p.amount ?? 0) - 1) } // prevents negative values and handles optional amount
                    : p
            )
        );
    };

    // Increment quantity
    const increment = () => {
        setSelectedProducts(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, amount: (p.amount ?? 0) + 1 }
                    : p
            )
        );
    };

    // Remove item from cart completely
    const remove = () => {
        setSelectedProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="flex bg-[#EEFCF3] p-[5px] rounded-[8px] items-center justify-between">
            {/* Product information display */}
            <div className="flex flex-col">
                <span className="font-[500] text-[14px]">{productName}</span>
                <span className="text-[#71717A] text-[12px]">${price} each</span>
            </div>
            
            {/* Quantity controls and remove button */}
            <div className="flex gap-[10px]">
                {/* Quantity adjustment controls */}
                <div className="flex gap-[15px] items-center">
                    <div onClick={decrement}>
                        <Button size="xs" className="bg-[#FFFFFF] border border-[#E4E4E7]">
                            <MinusIcon color="#000000" size="12" />
                        </Button>
                    </div>
                    <span>{amount}</span>
                    <div onClick={increment}>
                        <Button size="xs" className="bg-[#FFFFFF] border border-[#E4E4E7]">
                            <CrossIcon color="#000000" size="12" />
                        </Button>
                    </div>
                </div>
                
                {/* Remove item button */}
                <div onClick={remove}>
                    <Button size="xs" className="bg-[#EF4444]">
                        <TrashIcon color="#FFFFFF" size="14" />
                    </Button>
                </div>
            </div>
        </div>
    )
}