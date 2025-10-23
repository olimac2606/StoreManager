/**
 * Products card container component for sales interface
 * Provides a responsive grid layout for product selection in POS system
 * Props:
 *   - children: ReactNode containing product cards to display in the grid
 */
export default function ProductsCard({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <span className="font-[500] text-[24px]">Available Products</span>
            {/* Responsive grid with adaptive columns based on screen size */}
            <div className="grid grid-cols-3 gap-[1rem] max-[1200px]:grid-cols-2 max-[1000px]:grid-cols-1 mt-[1rem]">
                {children}
            </div>
        </div >
    )
}