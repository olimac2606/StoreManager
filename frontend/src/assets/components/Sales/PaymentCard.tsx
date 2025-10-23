// Chakra UI components for form handling
import { InputGroup, NumberInput } from "@chakra-ui/react"
import DollarIcon from "@/assets/utils/icons/DollarIcon"
import { Button } from "@chakra-ui/react"

// Utility components and context hooks
import Change from "../Change"
import { useSelectedProducts } from "@/assets/contexts/SelectedProductsContext"
import { useState } from "react"
import { toaster } from "@/components/ui/toaster"

/**
 * Payment card component for processing sales transactions
 * Handles payment input, change calculation, and sale completion
 * Integrates with selected products context for cart total calculation
 */
export default function PaymentCard() {
    // Context hook for selected products in cart
    const { selectedProducts } = useSelectedProducts()
    
    // State for amount received from customer
    const [amountReceive, setAmountReceive] = useState(0)
    
    // Calculate total amount from selected products
    const total = selectedProducts.reduce(
        (sum, p) => sum + p.price * (p.amount ?? 0),
        0
    );
    
    // Calculate change amount
    const change = amountReceive - total;
    
    // Handle amount received input changes
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmountReceive(parseFloat(e.target.value))
    }
    return (
        <div>
            <span className="text-[25px] font-[500]">Payment</span>
            
            {/* Total amount display */}
            <div className="py-[7px] border-b-[2px] border-[#E5E7EB] my-[10px] flex justify-between">
                <span className="text-[18px] font-[500]">Total:</span>
                <span className="text-[#16A34A] text-[18px] font-[500]">${total}</span>
            </div>
            
            <div className="flex flex-col gap-[0.8rem]">
                <span className="font-[500]">Amount receive</span>
                
                {/* Amount received input with dollar icon */}
                <form>
                    <NumberInput.Root>
                        <NumberInput.Label />
                        <NumberInput.Control>
                            <NumberInput.IncrementTrigger />
                            <NumberInput.DecrementTrigger />
                        </NumberInput.Control>
                        <NumberInput.Scrubber />
                        <InputGroup startElement={<DollarIcon color="currentColor" size="16" />}>
                            <NumberInput.Input onChange={handleChange} placeholder="0.00" />
                        </InputGroup>
                    </NumberInput.Root>
                </form>
                
                {/* Change display (only shown when change is positive) */}
                <div className={`${change >= 0 ? "" : "hidden"}`}>
                    <Change change={change} />
                </div>
                
                {/* Complete sale button with validation and feedback */}
                <Button onClick={() => {
                    if (change >= 0) {
                        toaster.create({
                            title: "Sale completed succesfully",
                            description: `Total: $${total}, Change: $${Math.round(change * 100) / 100}`,
                            type: "success",
                            closable: true,
                            duration: 5000,
                        })
                    } else {
                        toaster.create({
                            title: "Insufficient payment",
                            description: "Amount received is less than the total amount",
                            type: "error",
                            closable: true,
                            duration: 5000,
                        })
                    }
                }}
                    disabled={selectedProducts.length === 0 || amountReceive === 0 || isNaN(amountReceive)} className="bg-[#4ADE80] w-[100%]">
                    Complete Sale
                </Button>
            </div>
        </div >
    )
}