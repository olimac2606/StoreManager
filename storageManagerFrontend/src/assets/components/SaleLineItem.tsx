import { Button } from "@chakra-ui/react"
import CrossIcon from "../utils/icons/CrossIcon"
import MinusIcon from "../utils/icons/MinusIcon"
import { useState } from "react"
import TrashIcon from "../utils/icons/TrashIcon"

export default function SaleLineItem ({productName, price}: {productName: string, price: number}) {
    const [amount, setAmount] = useState(0)
    return (
        <div className="flex bg-[#EEFCF3] p-[5px] rounded-[8px] items-center justify-between">
            <div className="flex flex-col">
                <span className="font-[500] text-[14px]">{productName}</span>
                <span className="text-[#71717A] text-[12px]">${price} each</span>
            </div>
            <Button size="xs" className="bg-[#FFFFFF] border border-[#E4E4E7]" onClick={() => setAmount(amount => amount - 1)}>
                <MinusIcon color="#000000" size="12" />
            </Button>
            <span>{amount}</span>
            <Button size="xs" className="bg-[#FFFFFF] border border-[#E4E4E7]" onClick={() => setAmount(amount => amount + 1)}>
                <CrossIcon color="#000000" size="12" />
            </Button>
            <Button size="xs" className="bg-[#EF4444]">
                <TrashIcon color="#FFFFFF" size="14" />
            </Button>
        </div>
    )
}