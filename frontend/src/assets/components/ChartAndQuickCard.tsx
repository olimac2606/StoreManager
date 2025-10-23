// Type definition for chart and quick card component props
type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
    heightChildrenContainer?: string;
}

/**
 * Chart and quick card component for displaying data visualizations
 * Provides a consistent layout for charts and quick action components with title and description
 */
export default function GraphCard({ children, title, description, heightChildrenContainer }: Props) {
    return (
        <div>
            {/* Card header with title and description */}
            <div className="flex flex-col justify-between items-start mb-[0.5rem] gap-[0.2rem]">
                <span className="font-[500] text-[24px]">{title}</span>
                <span className="text-[#667085] text-[14px]">{description}</span>
            </div>
            {/* Content area with customizable height */}
            <div className={heightChildrenContainer}>
                {children}
            </div>
        </div>
    )
}