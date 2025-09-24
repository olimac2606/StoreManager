type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
    heightChildrenContainer?: string;
}
export default function GraphCard({ children, title, description, heightChildrenContainer }: Props) {
    return (
        <div>
            <div className="flex flex-col justify-between items-start mb-[0.5rem] gap-[0.2rem]">
                <span className="font-[500] text-[24px]">{title}</span>
                <span className="text-[#667085] text-[14px]">{description}</span>
            </div>
            <div className={heightChildrenContainer}>
                {children}
            </div>
        </div>
    )
}