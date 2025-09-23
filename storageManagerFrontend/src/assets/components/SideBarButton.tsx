import { Button } from "@chakra-ui/react";

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