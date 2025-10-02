import Card from "../components/Card"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsCard from "../components/ProductsCard"
import ProductCard from "../components/ProductCard"
import CurrentSaleCard from "../components/CurrentSaleCard"
import PaymentCard from "../components/PaymentCard"
import { useSelectedProducts } from "../contexts/SelectedProductsContext"
import type { Product } from "@/types/product"

const data: Product[] = [
    {
        id: 1,
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        amount: 0,
        stock: 25
    },
    {
        id: 2,
        name: "Laptop",
        category: "Electronics",
        price: 1299.99,
        amount: 0,
        stock: 15
    },
    {
        id: 3,
        name: "Headphones",
        category: "Electronics",
        price: 199.99,
        amount: 0,
        stock: 10
    }, {
        id: 4,
        name: "T-shirt",
        category: "Clothing",
        price: 29.99,
        amount: 0,
        stock: 100
    },
    {
        id: 5,
        name: "Jeans",
        category: "Clothing",
        price: 69.99,
        amount: 0,
        stock: 75
    },
    {
        id: 6,
        name: "Sneakers",
        category: "Clothing",
        price: 130.99,
        amount: 0,
        stock: 40
    },
    {
        id: 7,
        name: "Coffee Mug",
        category: "Home & Garden",
        price: 14.99,
        amount: 0,
        stock: 25
    },
    {
        id: 8,
        name: "Notebook",
        category: "Home & Garden",
        price: 9.99,
        amount: 0,
        stock: 150
    },
]

export default function Sales() {
    const { setSelectedProducts } = useSelectedProducts();
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
                                <div key={item.id}
                                    onClick={() => {
                                        setSelectedProducts(prev => {
                                            const idx = prev.findIndex(p => p.id === item.id);
                                            if (idx === -1) {
                                                return [...prev, { ...item, amount: 1 }];
                                            }
                                            const updated = { ...prev[idx], amount: (prev[idx].amount ?? 0) + 1 };
                                            return prev.map(p => p.id === item.id ? updated : p);
                                        });
                                    }}
                                >
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
                        <CurrentSaleCard />
                    </Card>
                    <Card>
                        <PaymentCard />
                    </Card>
                </div>
            </div>
        </div>
    )
}