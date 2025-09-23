import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

export default function GraphCard() {
    const chart = useChart({
        data: [
        { sales: 63000, day: "Mon" },
        { sales: 72000, day: "Tue" },
        { sales: 85000, day: "Wed" },
        { sales: 79000, day: "Thu" },
        { sales: 90000, day: "Fri" },
        { sales: 95000, day: "Sat" },
        { sales: 88000, day: "Sun" },
        ],
        series: [{ name: "sales", color: "teal.solid" }],
    })
    return (
        <div className="bg-[#FFFFFF] p-[4px] rounded-[8px] mt-[1rem] border border-[#E4E4E7]">
            <div className="p-[1rem]">
                <div className="flex flex-col justify-between items-start mb-[0.5rem] gap-[0.2rem]">
                    <span className="font-[500] text-[24px]">Weekly Sales</span>
                    <span className="text-[#667085] text-[14px]">Sales performance over the last 7 days</span>
                </div>
                <div>
                    <Chart.Root maxH="sm" chart={chart}>
                        <BarChart data={chart.data}>
                            <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                            <XAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey={chart.key("day")}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={chart.formatNumber({
                                style: "currency",
                                currency: "USD",
                                notation: "compact",
                            })}
                            />
                            <Tooltip
                            cursor={{ fill: chart.color("bg.muted") }}
                            animationDuration={0}
                            content={<Chart.Tooltip />}
                            />
                            {chart.series.map((item) => (
                            <Bar
                                isAnimationActive={false}
                                key={item.name}
                                dataKey={chart.key(item.name)}
                                fill={chart.color(item.color)}
                            />
                            ))}
                        </BarChart>
                    </Chart.Root>
                </div>
            </div>
        </div>
    )
}