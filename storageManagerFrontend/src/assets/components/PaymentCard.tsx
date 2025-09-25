import { InputGroup, Input } from "@chakra-ui/react"
import DollarIcon from "../utils/icons/DollarIcon"
import { Button } from "@chakra-ui/react"
import Change from "./Change"

export default function PaymentCard({ total }: { total: number }) {
    return (
        <div>
            <span className="text-[25px] font-[500]">Payment</span>
            <div className="py-[7px] border-b-[2px] border-[#E5E7EB] my-[10px] flex justify-between">
                <span className="text-[18px] font-[500]">Total:</span>
                <span className="text-[#16A34A] text-[18px] font-[500]">${total}</span>
            </div>
            <div className="flex flex-col gap-[0.8rem]">
                <span className="font-[500]">Amount receive</span>
                <InputGroup startElement={<DollarIcon color="currentColor" size="16" />}>
                    <Input placeholder="0.00" />
                </InputGroup>
                {/* <Change /> */}
                <Button disabled className="bg-[#4ADE80] w-[100%]">
                    Complete Sale
                </Button>
            </div>
        </div>
    )
}