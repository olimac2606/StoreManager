// import ClearButton from "./ClearButton"
import SaleLineItem from "./SaleLineItem"

export default function CurrentSaleCard () {
    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-[25px] font-[500]">Current Sale</span>
                {/* <ClearButton /> */}
            </div>
            {/* <div className="h-[5rem] flex items-center justify-center">
                <span className="text-[#667085]">No items in sale</span>
            </div> */}
            <div className="mt-[20px]">
                <SaleLineItem productName="Phone" price={3000} />
            </div>
        </div>
    )
}