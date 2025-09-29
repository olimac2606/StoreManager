import { InputGroup, NumberInput } from "@chakra-ui/react"
import DollarIcon from "../utils/icons/DollarIcon"
import { Button } from "@chakra-ui/react"
import Change from "./Change"
import { useSelectedProducts } from "../contexts/SelectedProductsContext"
import { useState } from "react"
import { toaster } from "@/components/ui/toaster"


export default function PaymentCard() {
    const { selectedProducts } = useSelectedProducts()
    const [amountReceive, setAmountReceive] = useState(0)
    const total = selectedProducts.reduce((sum, product) => sum + product.price * product.amount, 0);
    const change = amountReceive - total;
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmountReceive(parseFloat(e.target.value))
    }
    return (
        <div>
            <span className="text-[25px] font-[500]">Payment</span>
            <div className="py-[7px] border-b-[2px] border-[#E5E7EB] my-[10px] flex justify-between">
                <span className="text-[18px] font-[500]">Total:</span>
                <span className="text-[#16A34A] text-[18px] font-[500]">${total}</span>
            </div>
            <div className="flex flex-col gap-[0.8rem]">
                <span className="font-[500]">Amount receive</span>
                <form >
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
                <div className={`${change >= 0 ? "" : "hidden"}`}>
                    <Change change={change} />
                </div>
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