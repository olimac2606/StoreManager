// Icon and UI component imports
import EditIcon from "../utils/icons/EditIcon"
import { Button } from "@chakra-ui/react"
import { forwardRef } from "react"

/**
 * Edit button component for edit actions
 * Renders a styled button with edit icon for triggering edit operations
 * Uses forwardRef to support ref forwarding for form integration
 * Props:
 *   - text: optional text label to display alongside the edit icon
 *   - ...props: additional Button component props
 */
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
