import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart } from "recharts"

export default function PieChartComponent({
    GraphDataProp,
}: {
    GraphDataProp: { value: number; name: string; color: string }[]
}) {
    const chart = useChart({
        data: GraphDataProp,
    })

    return (
        <Chart.Root w="100%" h="100%" chart={chart}>
            <PieChart>
                <Pie
                    isAnimationActive={false}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    outerRadius="80%"
                    labelLine={false}
                    label={({ name, index }) => {
                        const { value } = chart.data[index ?? -1]
                        const percent = value / chart.getTotal("value")
                        return `${name}: ${(percent * 100).toFixed(1)}%`
                    }}
                >
                    {chart.data.map((item) => (
                        <Cell key={item.name} fill={chart.color(item.color)} />
                    ))}
                </Pie>
            </PieChart>
        </Chart.Root>
    )
}
