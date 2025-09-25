import ClearButton from "./ClearButton"
import SaleLineItem from "./SaleLineItem"

export default function CurrentSaleCard({ selectedProducts }: { selectedProducts: { name: string; price: number; stock: number; category: string; id: number }[] }) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-[25px] font-[500]">Current Sale</span>
                {selectedProducts.length > 0 ?
                    <div>
                        <ClearButton />
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
                {selectedProducts.map((item) => (
                    <div className="mb-[10px]" key={item.id}>
                        <SaleLineItem productName={item.name} price={item.price} />
                    </div>
                ))}
            </div>
        </div>
    )
}