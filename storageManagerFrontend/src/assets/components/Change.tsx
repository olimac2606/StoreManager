export default function Change({ change }: { change: number }) {
    const rounded = Math.round(change * 100) / 100
    return (
        <div className="bg-[#EEFCF3] flex justify-between items-center p-[8px] rounded-[10px]">
            <span className="font-[600] text-[18px]">Change:</span>
            <span className="font-[600] text-[18px] text-[#16A34A]">{!isNaN(rounded) ? rounded : "0"}</span>
        </div>
    )
}