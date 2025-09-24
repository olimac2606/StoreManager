import React from "react";
import Card from "../components/Card";
import ChartAndQuickCard from "../components/ChartAndQuickCard";
import StatCard from "../components/StatCard";
import DollarIcon from "../utils/icons/DollarIcon";
import ProductsIcon from "../utils/icons/ProductsIcon";
import BarChartComponent from "../utils/charts/BarChartComponent";
import PieChartComponent from "../utils/charts/PieChartComponent";
import QuickActionsCard from "../components/QuickActionsCard";

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

type BarChartDataProp = { sales: number; day: string }[];
type PieChartDataProp = { value: number; name: string; color: string }[];
type ChartDataProp = BarChartDataProp | PieChartDataProp;

type ChartCardInfo = {
  title: string;
  description: string;
};

export default function Dashboard() {
  const barData: ChartCardInfo = {
    title: "Sales This Week",
    description: "Sales performance over the last 7 days",
  }

  const pieData: ChartCardInfo = {
    title: "Top Categories",
    description: "Best selling product categories",
  }

  const pieChartData: ChartDataProp = [
    { value: 25, name: "Clothing", color: "blue.solid" },
    { value: 20, name: "Home & Garden", color: "purple.solid" },
    { value: 12, name: "Sports", color: "orange.solid" },
    { value: 8, name: "Other", color: "gray.solid" },
    { value: 35, name: "Electronics", color: "green.solid" },
  ];

  const barChartData: ChartDataProp = [
    { sales: 63000, day: "Mon" },
    { sales: 72000, day: "Tue" },
    { sales: 55000, day: "Wed" },
    { sales: 46000, day: "Thu" },
    { sales: 83000, day: "Fri" },
    { sales: 71000, day: "Sat" },
    { sales: 68000, day: "Sun" },
  ];

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
                {card.icon({ color: "#667085", size: "16" })}
              </StatCard>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        <Card minWidth="min-w-[693px]" maxHeight="max-h-[424px]">
          <ChartAndQuickCard heightChildrenContainer="h-[300px]" title={barData.title} description={barData.description}>
            <BarChartComponent GraphDataProp={barChartData} />
          </ChartAndQuickCard>
        </Card>
        <Card minWidth="min-w-[693px]" maxHeight="max-h-[424px]">
          <ChartAndQuickCard heightChildrenContainer="h-[300px]" title={pieData.title} description={pieData.description}>
            <PieChartComponent GraphDataProp={pieChartData} />
          </ChartAndQuickCard>
        </Card>
      </div>
      <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        <Card>
          <ChartAndQuickCard title="Quick Actions" description="Jump to commonly used features">
            <QuickActionsCard />
          </ChartAndQuickCard>
        </Card>
      </div>
    </div >
  );
}
