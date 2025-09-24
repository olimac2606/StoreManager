export default function ProductsCard ({children}: {children: React.ReactNode}) {
    return (
        <div>
            <span className="font-[500] text-[24px]">Available Products</span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[1rem]">
                {children}
            </div>
        </div>
    )
}