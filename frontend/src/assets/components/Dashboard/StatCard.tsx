import ArrowDownIcon from "../../utils/icons/ArrowDownIcon"
import ArrowUpIcon from "../../utils/icons/ArrowUpIcon"

type StatCardProps = {
    title: string,
    children: React.ReactNode,
    amount: string,
    change?: string,
    changeType?: 'increase' | 'decrease',
    description: string,
}

export default function StatCard({ title, children, amount, change, changeType, description, }: StatCardProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-[0.5rem]">
                <span className="font-[500]">{title}</span>
                {children}
            </div>
            <div>
                <span className="text-[24px] font-[700]">{amount}</span>
                <div className="flex items-center gap-[0.2rem] text-[12px]">
                    {changeType === 'increase' && change ? (
                        <ArrowUpIcon color="#4ADE80" size="12" />
                    ) : changeType === 'decrease' ? (
                        <ArrowDownIcon color="#EF4444" size="12" />
                    ) : null}
                    {change && (
                        <span className={`${changeType === "increase" ? 'text-[#4ADE80]' : 'text-[#EF4444]'}`}>{changeType === "increase" ? "+" : "-"}{change}</span>
                    )}

                </div>
                <span className="text-[12px] text-[#667085]">{description}</span>
            </div>
        </div>
    )
}