import { Chart, useChart } from "@chakra-ui/charts"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts"

export default function BarChartComponent({
    GraphDataProp,
}: {
    GraphDataProp: { sales: number; day: string }[]
}) {
    const chart = useChart({
        data: GraphDataProp,
        series: [{ name: "sales", color: "teal.solid" }],
    })

    return (
        <Chart.Root w="100%" h="100%" chart={chart}>
            <ResponsiveContainer width="100%" height={300}>
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
            </ResponsiveContainer>
        </Chart.Root>
    )
}
