import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { useState } from "react"

export default function SideBar() {
    const [isSelected, setIsSelected] = useState<string>("dashboard")
    return (
        <aside className="h-screen w-[18rem] border-r px-[1.5rem]">
            <div className="flex items-center gap-2 py-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store h-8 w-8 text-primary"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg>
                <span className="text-[1.30rem] font-[600] ml-[5px]">StoreManager</span>
            </div>
            <nav className="mt-[1rem]">
                <ul className="flex flex-col gap-[0.5rem]">
                    <li>
                        <Link to='/'>
                            <Button onClick={() => setIsSelected("dashboard")} size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${isSelected === "dashboard" ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${isSelected !== "dashboard" ? '#d1fae5' : ''}`, color: `${isSelected !== "dashboard" ? '#000000' : ''}` }} color={`${isSelected === "dashboard" ? "#ffffff" : "gray.500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                                Dashboard
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/sales'>
                            <Button onClick={() => setIsSelected("sales")} size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${isSelected === "sales" ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${isSelected !== "sales" ? '#d1fae5' : ''}`, color: `${isSelected !== "sales" ? '#000000' : ''}` }} color={`${isSelected === "sales" ? "#ffffff" : "gray.500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-4 w-4"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                                Sales
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/products'>
                            <Button onClick={() => setIsSelected("products")} size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${isSelected === "products" ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${isSelected !== "products" ? '#d1fae5' : ''}`, color: `${isSelected !== "products" ? '#000000' : ''}` }} color={`${isSelected === "products" ? "#ffffff" : "gray.500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-4 w-4"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>
                                Products
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/suppliers'>
                            <Button onClick={() => setIsSelected("suppliers")} size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${isSelected === "suppliers" ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${isSelected !== "suppliers" ? '#d1fae5' : ''}`, color: `${isSelected !== "suppliers" ? '#000000' : ''}` }} color={`${isSelected === "suppliers" ? "#ffffff" : "gray.500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Suppliers
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports'>
                            <Button onClick={() => setIsSelected("reports")} size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${isSelected === "reports" ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${isSelected !== "reports" ? '#d1fae5' : ''}`, color: `${isSelected !== "reports" ? '#000000' : ''}` }} color={`${isSelected === "reports" ? "#ffffff" : "gray.500"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column h-4 w-4"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
                                Reports
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}