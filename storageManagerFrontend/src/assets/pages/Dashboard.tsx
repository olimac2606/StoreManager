import React from "react";
import Card from "../components/Card";
import GraphCard from "../components/GraphCard";
import StatCard from "../components/StatCard";
import DollarIcon from "../utils/icons/DollarIcon";
import ProductsIcon from "../utils/icons/ProductsIcon";

type IconProps = {
  color: string;
  size: string;
};

type IconRender = (p: IconProps) => React.ReactNode;

type CardInfo = {
  title: string;
  amount: string;
  change?: string;
  changeType?: "increase" | "decrease";
  description: string;
  icon: IconRender;
};

export default function Dashboard() {
  const cards: CardInfo[] = [
    {
      title: "Daily Sales",
      amount: "$5,231",
      change: "12.5%",
      changeType: "increase",
      description: "from yesterday",
      icon: (p) => <DollarIcon {...p} />
    },
    {
      title: "Products in Stock",
      amount: "1,284",
      description: "+23 new products added",
      icon: (p) => <ProductsIcon {...p} />,
    },
    {
      title: "Total Purchases",
      amount: "3,000",
      change: "8.4%",
      changeType: "decrease",
      description: "from last week",
      icon: (p) => <DollarIcon {...p} />,
    },
  ];

  return (
    <div className="px-[1.8rem] pt-[1rem] bg-[#FAFAFA]">
      <div>
        <h1 className="text-[30px] font-[700]">Dashboard</h1>
        <span className="text-[#667085]">Overview of your store performance</span>
      </div>

      <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {cards.map((card) => (
          <div key={card.title}>
            <Card>
              <StatCard
                title={card.title}
                amount={card.amount}
                change={card.change}
                changeType={card.changeType}
                description={card.description}
              >
                {card.icon({color: "#667085", size: "16"})}
              </StatCard>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        <GraphCard />
        <GraphCard />
      </div>
    </div>
  );
}
