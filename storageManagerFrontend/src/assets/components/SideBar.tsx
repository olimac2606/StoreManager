import React from "react"
import { Link, useLocation } from "react-router-dom"
import StorageManagerIcon from "../utils/icons/StorageManagerIcon"
import SideBarButton from "./SideBarButton"
import ReportsIcon from "../utils/icons/ReportsIcon"
import SuppliersIcon from "../utils/icons/SuppliersIcon"
import DashboardIcon from "../utils/icons/DashboardIcon"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsIcon from "../utils/icons/ProductsIcon"

type IconProps = {
    color: string;
    size: string;
};

type IconRender = (p: IconProps) => React.ReactNode;

type ItemsInfo = {
    name: string
    icon: IconRender;
    path: string;
};

export default function SideBar() {
    const location = useLocation();
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
            <div className="flex items-center gap-2 py-[20px]">
                <StorageManagerIcon color={"#4ADE80"} size="33" />
                <span className="text-[1.30rem] font-[600] ml-[5px]">StoreManager</span>
            </div>
            <nav className="mt-[1rem]">
                <ul className="flex flex-col gap-[0.5rem]">
                    {items.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path}>
                                <SideBarButton
                                    onSelected={location.pathname === item.path}
                                    name={item.name}
                                >
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