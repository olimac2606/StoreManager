import Card from "../components/Card"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsCard from "../components/ProductsCard"
import ProductCard from "../components/ProductCard"
import CurrentSaleCard from "../components/CurrentSaleCard"
import PaymentCard from "../components/PaymentCard"
import { useState } from "react"

type Data = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

const data: Data[] = [
    {
        id: 1,
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        id: 2,
        name: "Laptop",
        category: "Electronics",
        price: 1299.99,
        stock: 15
    },
    {
        id: 3,
        name: "Headphones",
        category: "Electronics",
        price: 199.99,
        stock: 10
    }, {
        id: 4,
        name: "T-shirt",
        category: "Clothing",
        price: 29.99,
        stock: 100
    },
    {
        id: 5,
        name: "Jeans",
        category: "Clothing",
        price: 69.99,
        stock: 75
    },
    {
        id: 6,
        name: "Sneakers",
        category: "Clothing",
        price: 130.99,
        stock: 40
    },
    {
        id: 7,
        name: "Coffee Mug",
        category: "Accessories",
        price: 14.99,
        stock: 25
    },
    {
        id: 8,
        name: "Notebook",
        category: "Accessories",
        price: 9.99,
        stock: 150
    },
]

export default function Sales() {
    const [selectedProducts, setSelectedProducts] = useState<Data[]>([]);
    return (
        <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
            <div className="flex gap-[10px] items-center">
                <SalesIcon color="#4ADE80" size="25" />
                <h1 className="text-[30px] font-[700]">Sales - POS System</h1>
            </div>
            <div className="grid grid-cols-[4fr_2fr] gap-[1.5rem]">
                <div>
                    <Card>
                        <ProductsCard>
                            {data.map((item) => (
                                <div key={item.id} onClick={() => { setSelectedProducts(prev => [...prev, item]) }}>
                                    <ProductCard
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        stock={item.stock}
                                    />
                                </div>
                            ))}
                        </ProductsCard>
                    </Card>
                </div>
                <div className="flex flex-col gap-[0.1rem]">
                    <Card>
                        <CurrentSaleCard selectedProducts={selectedProducts} />
                    </Card>
                    <Card>
                        <PaymentCard total={0} />
                    </Card>
                </div>
            </div>
        </div>
    )
}