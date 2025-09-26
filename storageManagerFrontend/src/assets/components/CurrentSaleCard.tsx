import ClearButton from "./ClearButton"
import SaleLineItem from "./SaleLineItem"
import { useSelectedProducts } from "../contexts/SelectedProductsContext"

export default function CurrentSaleCard() {
    const {selectedProducts, setSelectedProducts} = useSelectedProducts();
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-[25px] font-[500]">Current Sale</span>
                {selectedProducts.length > 0 ?
                    <div onClick={() => setSelectedProducts([])}>
                        <ClearButton text="Clear"/>
                    </div>
                    : null
                }
            </div>
            {selectedProducts.length === 0 ? (
                <div className="h-[5rem] flex items-center justify-center">
                    <span className="text-[#667085]">No items in sale</span>
                </div>
            ) : null}
            <div className="mt-[20px]">
                {selectedProducts
                .filter(item => item.amount > 0)
                .map((item) => (
                    <div className="mb-[10px]" key={item.id}>
                        <SaleLineItem id={item.id} productName={item.name} price={item.price} amount={item.amount}/>
                    </div>
                ))}
            </div>
        </div>
    )
} 