import ProductsIcon from "../utils/icons/ProductsIcon";
import QuickButton from "./QuickButton";
import SuppliersIcon from "../utils/icons/SuppliersIcon";
import ReportsIcon from "../utils/icons/ReportsIcon";

export default function QuickActionsCard() {
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