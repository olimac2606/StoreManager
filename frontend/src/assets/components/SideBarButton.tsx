// Chakra UI Button component for sidebar navigation
import { Button } from "@chakra-ui/react";

/**
 * Sidebar navigation button component
 * Renders a styled button for sidebar navigation with active state styling
 * Props:
 *   - children: ReactNode containing the icon element
 *   - name: optional text label for the button
 *   - onSelected: boolean indicating if this button is currently selected/active
 */
export default function SideBarButton({ children, name, onSelected, }: { children: React.ReactNode, name?: string, onSelected?: boolean }) {
    return (
        <Button 
        size="sm" w="full" justifyContent="flex-start" rounded="lg" bg={`${onSelected ? "#4ADE80" : "transparent"}`} _hover={{ bg: `${!onSelected ? '#d1fae5' : ''}`, color: `${!onSelected ? '#000000' : ''}` }} color={`${onSelected ? "#ffffff" : "gray.500"}`}
        >
            {children}
            {name}
        </Button>
    )
}