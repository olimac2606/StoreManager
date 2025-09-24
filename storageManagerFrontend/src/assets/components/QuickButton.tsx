import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function QuickButton({ children, buttonName, buttonPath }: { children: React.ReactNode, buttonName: string, buttonPath: string }) {
    return (
        <Link to={buttonPath}>
            <Button className="rounded-[8px] mt-[1rem] border border-[#E4E4E7] w-[100%] flex flex-col h-[auto] py-[0.5rem] bg-[#FAFAFA] hover:bg-[#EEFCF3] text-[#000000] hover:text-[#A0E7B9]">
                {children}
                {buttonName}
            </Button>
        </Link>
    )
}