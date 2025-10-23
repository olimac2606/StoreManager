// Icon imports for quick action buttons
import ProductsIcon from "../utils/icons/ProductsIcon";
import QuickButton from "./QuickButton";
import SuppliersIcon from "../utils/icons/SuppliersIcon";
import ReportsIcon from "../utils/icons/ReportsIcon";

/**
 * Quick actions card component for dashboard navigation
 * Displays a grid of quick action buttons for common application sections
 * Provides shortcuts to Products, Suppliers, and Reports pages
 */
export default function QuickActionsCard() {
    // Configuration for quick action buttons
    const buttons = [
        {
            buttonName: "Products",
            icon: <ProductsIcon color="currentColor" size="24" />,
            buttonPath: "/products"
        },
        {
            buttonName: "Suppliers",
            icon: <SuppliersIcon color="currentColor" size="24" />,
            buttonPath: "/suppliers"

        },
        {
            buttonName: "Reports",
            icon: <ReportsIcon color="currentColor" size="24" />,
            buttonPath: "/reports"
        }
    ]
    
    return (
        <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            {buttons.map((button) => (
                <div key={button.buttonName}>
                    <QuickButton buttonName={button.buttonName} buttonPath={button.buttonPath}>
                        {button.icon}
                    </QuickButton>
                </div>
            ))}
        </div>
    )
}