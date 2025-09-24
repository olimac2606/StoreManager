import Card from "../components/Card"
import SalesIcon from "../utils/icons/SalesIcon"
import ProductsCard from "../components/ProductsCard"
import ProductCard from "../components/ProductCard"
import CurrentSaleCard from "../components/CurrentSaleCard"
import PaymentCard from "../components/PaymentCard"

type Data = {
    name: string;
    category: string;
    price: number;
    stock: number;
}

const data: Data[] = [
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },{
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 699.99,
        stock: 25
    },
]

export default function Sales() {
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
                            {data.map((item, i) =>( 
                                <ProductCard 
                                    key={i}
                                    name={item.name}
                                    category={item.category}
                                    price={item.price}
                                    stock={item.stock}
                                />
                            ))}
                        </ProductsCard>
                    </Card>
                </div>
                <div className="flex flex-col gap-[0.1rem]">
                    <Card>
                        <CurrentSaleCard />
                    </Card>
                    <Card>
                        <PaymentCard total={3000} />
                    </Card>
                </div>
            </div>
        </div>
    )
}