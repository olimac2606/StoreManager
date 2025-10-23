// React core imports
import React from "react"
import { Link, useLocation } from "react-router-dom"

// Application branding icon
import StorageManagerIcon from "../utils/icons/StorageManagerIcon"

// Navigation components
import SideBarButton from "./SideBarButton"

// Navigation icons for different sections
import ReportsIcon from "../utils/icons/ReportsIcon"
import SuppliersIcon from "../utils/icons/SuppliersIcon"
import DashboardIcon from "../utils/icons/DashboardIcon"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsIcon from "../utils/icons/ProductsIcon"

// Type definitions for consistent icon rendering
type IconProps = {
    color: string;
    size: string;
};

// Function type for rendering icons with standardized props
type IconRender = (p: IconProps) => React.ReactNode;

// Navigation item configuration with name, icon, and route path
type ItemsInfo = {
    name: string
    icon: IconRender;
    path: string;
};

/**
 * SideBar component providing main navigation for the application
 * Displays navigation items with icons and handles active state highlighting
 */
export default function SideBar() {
    // Get current route location for active state management
    const location = useLocation();
    
    // Navigation items configuration with icons and routes
    const items: ItemsInfo[] = [
        {
            name: "Dashboard",
            icon: (p) => <DashboardIcon {...p} />,
            path: "/",
        },
        {
            name: "Sales",
            icon: (p) => <SalesIcon {...p} />,
            path: "/sales",
        },
        {
            name: "Products",
            icon: (p) => <ProductsIcon {...p} />,
            path: "/products",
        },
        {
            name: "Suppliers",
            icon: (p) => <SuppliersIcon {...p} />,
            path: "/suppliers",
        },
        {
            name: "Reports",
            icon: (p) => <ReportsIcon {...p} />,
            path: "/reports",
        },
    ];

    return (
        <aside className="h-screen w-[18rem] border-r px-[1.5rem]">
            {/* Application branding header */}
            <div className="flex items-center gap-2 py-[20px]">
                <StorageManagerIcon color={"#4ADE80"} size="33" />
                <span className="text-[1.30rem] font-[600] ml-[5px]">StoreManager</span>
            </div>
            
            {/* Navigation menu with dynamic active state */}
            <nav className="mt-[1rem]">
                <ul className="flex flex-col gap-[0.5rem]">
                    {items.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path}>
                                <SideBarButton
                                    onSelected={location.pathname === item.path}
                                    name={item.name}
                                >
                                    {/* Dynamic icon color based on active state */}
                                    {item.icon({
                                        color: location.pathname === item.path ? "#FFFFFF" : "#71717A",
                                        size: "16"
                                    })}
                                </SideBarButton>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}