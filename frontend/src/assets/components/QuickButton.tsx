// Chakra UI Button component and React Router Link
import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

/**
 * Quick action button component for navigation
 * Renders a styled button with icon and text that navigates to specified routes
 * Props:
 *   - children: ReactNode containing the icon element
 *   - buttonName: text label displayed on the button
 *   - buttonPath: route path for navigation when button is clicked
 */
export default function QuickButton({ children, buttonName, buttonPath }: { children: React.ReactNode, buttonName: string, buttonPath: string }) {
    return (
        <Link to={buttonPath}>
            <Button className="rounded-[8px] mt-[1rem] border border-[#E4E4E7] w-[100%] flex flex-col h-[auto] py-[0.5rem] bg-[#FAFAFA] hover:bg-[#EEFCF3] text-[#000000] hover:text-[#0B9C1A]">
                {children}
                {buttonName}
            </Button>
        </Link>
    )
}