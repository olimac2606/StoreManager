import Card from "./Card"
import { Button } from "@chakra-ui/react"
import CrossIcon from "../utils/icons/CrossIcon"

type Props = {
    name: string;
    category: string;
    stock: number;
    price: number
}

export default function ProductCard ({ name, category, stock, price }: Props) {
    return (
        <Card minWidth="min-w-[183px]">
            <div>
                <div className="flex flex-col">
                    <span className="font-[500] mb-[8px]">{name}</span>
                    <span className="text-[13px] bg-[#F1F6F8] px-[12px] py-[2px] font-[500] rounded-full w-fit">{category}</span>
                </div>
                <div className="flex justify-between my-[10px] items-center">
                    <span className="text-[#4ADE80] font-[700] text-[18px]">${price}</span>
                    <span className="text-[#71717A] text-[14px]">{`Stock: ${stock}`}</span>
                </div>
                <Button className="bg-[#4ADE80] hover:bg-[#56fa92ff] w-[100%]">
                    <CrossIcon color="#FFFFFF" size="20" />
                    Add to Sale
                </Button>
            </div>
        </Card>
    )
}