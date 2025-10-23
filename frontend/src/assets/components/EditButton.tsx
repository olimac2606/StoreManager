import EditIcon from "../utils/icons/EditIcon"
import { Button } from "@chakra-ui/react"
import { forwardRef } from "react"

const EditButton = forwardRef<HTMLButtonElement, { text?: string } & React.ComponentProps<typeof Button>>(
  ({ text, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="sm"
        className="rounded-[8px] border border-[#E4E4E7] bg-[#FAFAFA] hover:bg-[#EEFCF3] text-[#000000] hover:text-[#0B9C1A]"
        {...props}
      >
        <EditIcon color="currentColor" size="8" />
        {text && text}
      </Button>
    )
  }
)

export default EditButton
