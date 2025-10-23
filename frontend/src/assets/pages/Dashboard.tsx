// React core import
import React from "react";

// UI components for dashboard layout and data display
import Card from "../components/Card";
import ChartAndQuickCard from "../components/ChartAndQuickCard";
import StatCard from "../components/Dashboard/StatCard";

// Icon components for visual representation
import DollarIcon from "../utils/icons/DollarIcon";
import ProductsIcon from "../utils/icons/ProductsIcon";

// Chart components for data visualization
import BarChartComponent from "../utils/charts/BarChartComponent";
import PieChartComponent from "../utils/charts/PieChartComponent";

// Quick actions component for common operations
import QuickActionsCard from "../components/QuickActionsCard";

// Type definitions for icon rendering with consistent props
type IconProps = {
  color: string;
  size: string;
};

// Function type for rendering icons with props
type IconRender = (p: IconProps) => React.ReactNode;

// Type definition for dashboard stat cards with metrics and icons
type CardInfo = {
  title: string;
  amount: string;
  change?: string;
  changeType?: "increase" | "decrease";
  description: string;
  icon: IconRender;
};

// Chart data type definitions for different chart types
type BarChartDataProp = { sales: number; day: string }[];
type PieChartDataProp = { value: number; name: string; color: string }[];
type ChartDataProp = BarChartDataProp | PieChartDataProp;

// Type definition for chart card headers and descriptions
type ChartCardInfo = {
  title: string;
  description: string;
};

/**
 * Dashboard component displaying store overview with metrics, charts, and quick actions
 * Provides a comprehensive view of store performance and key statistics
 */
export default function Dashboard() {
  // Configuration for bar chart displaying weekly sales data
  const barData: ChartCardInfo = {
    title: "Sales This Week",
    description: "Sales performance over the last 7 days",
  }

  // Configuration for pie chart displaying category performance
  const pieData: ChartCardInfo = {
    title: "Top Categories",
    description: "Best selling product categories",
  }

  // Sample data for pie chart showing category distribution
  const pieChartData: ChartDataProp = [
    { value: 25, name: "Clothing", color: "blue.solid" },
    { value: 20, name: "Home & Garden", color: "purple.solid" },
    { value: 12, name: "Sports", color: "orange.solid" },
    { value: 8, name: "Other", color: "gray.solid" },
    { value: 35, name: "Electronics", color: "green.solid" },
  ];

  // Sample data for bar chart showing daily sales performance
  const barChartData: ChartDataProp = [
    { sales: 63000, day: "Mon" },
    { sales: 72000, day: "Tue" },
    { sales: 55000, day: "Wed" },
    { sales: 46000, day: "Thu" },
    { sales: 83000, day: "Fri" },
    { sales: 71000, day: "Sat" },
    { sales: 68000, day: "Sun" },
  ];

  // Dashboard stat cards configuration with metrics and visual indicators
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
      {/* Dashboard header with title and description */}
      <div>
        <h1 className="text-[30px] font-[700]">Dashboard</h1>
        <span className="text-[#667085]">Overview of your store performance</span>
      </div>

      {/* Grid layout for stat cards showing key metrics */}
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

      {/* Grid layout for chart components showing sales and category data */}
      <div className="grid gap-[1.5rem] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {/* Bar chart displaying weekly sales performance */}
        <Card maxHeight="max-h-[424px]">
          <ChartAndQuickCard heightChildrenContainer="h-[300px]" title={barData.title} description={barData.description}>
            <BarChartComponent GraphDataProp={barChartData} />
          </ChartAndQuickCard>
        </Card>
        {/* Pie chart displaying category distribution */}
        <Card maxHeight="max-h-[424px]">
          <ChartAndQuickCard heightChildrenContainer="h-[300px]" title={pieData.title} description={pieData.description}>
            <PieChartComponent GraphDataProp={pieChartData} />
          </ChartAndQuickCard>
        </Card>
      </div>
      
      {/* Quick actions section for common operations */}
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
