import { Button } from "@chakra-ui/react"
import CrossIcon from "../utils/icons/CrossIcon"
import MinusIcon from "../utils/icons/MinusIcon"
import TrashIcon from "../utils/icons/TrashIcon"
import { useSelectedProducts } from "../contexts/SelectedProductsContext"

export default function SaleLineItem({ productName, price, amount, id }: { productName: string, price: number, amount: number, id: number }) {
    const {setSelectedProducts} = useSelectedProducts()
    const decrement = () => {
        setSelectedProducts(prev =>
        prev.map(p =>
            p.id === id
            ? { ...p, amount: Math.max(0, (p.amount ?? 0) - 1) } // evita negativos y cubre amount opcional
            : p
        )
        );
    };

    const increment = () => {
        setSelectedProducts(prev =>
        prev.map(p =>
            p.id === id
            ? { ...p, amount: (p.amount ?? 0) + 1 }
            : p
        )
        );
    };

    const remove = () => {
        setSelectedProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="flex bg-[#EEFCF3] p-[5px] rounded-[8px] items-center justify-between">
            <div className="flex flex-col">
                <span className="font-[500] text-[14px]">{productName}</span>
                <span className="text-[#71717A] text-[12px]">${price} each</span>
            </div>
            <div className="flex gap-[10px]">
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
                <div onClick={remove}>
                    <Button size="xs" className="bg-[#EF4444]">
                        <TrashIcon color="#FFFFFF" size="14" />
                    </Button>
                </div>
            </div>
        </div>
    )
}