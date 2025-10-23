// Card component and UI elements
import Card from "../Card"
import { Button } from "@chakra-ui/react"
import CrossIcon from "@/assets/utils/icons/CrossIcon"

// Type definition for product card props
type Props = {
  name: string;
  category: string;
  stock: number;
  price: number
}

/**
 * Product card component for sales interface
 * Displays product information in a clickable card format for POS system
 * Props:
 *   - name: product name to display
 *   - category: product category for classification
 *   - stock: current stock quantity available
 *   - price: product price for sale
 */
export default function ProductCard({ name, category, stock, price }: Props) {
  return (
    <Card withoutMargin={true} hover="hover:bg-[#EEFCF3]" pointer="cursor-pointer" minWidth="min-w-[183px]">
      <div>
        {/* Product information section */}
        <div className="flex flex-col">
          <span className="font-[500] mb-[8px]">{name}</span>
          <span className="text-[13px] bg-[#F1F6F8] px-[12px] py-[2px] font-[500] rounded-full w-fit">{category}</span>
        </div>
        
        {/* Price and stock information */}
        <div className="flex justify-between my-[10px] items-center">
          <span className="text-[#4ADE80] font-[700] text-[18px]">${price}</span>
          <span className="text-[#71717A] text-[14px]">{`Stock: ${stock}`}</span>
        </div>
        
        {/* Add to sale button */}
        <Button className="bg-[#4ADE80] w-[100%]">
          <CrossIcon color="#FFFFFF" size="20" />
          Add to Sale
        </Button>
      </div>
    </Card>
  )
}