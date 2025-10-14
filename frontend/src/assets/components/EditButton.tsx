import EditIcon from "../utils/icons/EditIcon"
import { Button } from "@chakra-ui/react"

export default function EditButton ({text}: {text?: string}) {
    return (
        <div>
            <Button size="sm" className="rounded-[8px] border border-[#E4E4E7] bg-[#FAFAFA] hover:bg-[#EEFCF3] text-[#000000] hover:text-[#0B9C1A]">
                <EditIcon color="currentColor" size="8" />
                {text ? text : undefined}
            </Button>
        </div>
    )
}