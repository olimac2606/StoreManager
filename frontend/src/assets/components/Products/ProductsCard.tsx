/**
 * Products card container component for displaying product grids
 * Provides a responsive grid layout for product items with adaptive columns
 * Props:
 *   - children: ReactNode containing product items to display in the grid
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