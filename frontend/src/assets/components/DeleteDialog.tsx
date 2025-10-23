// Chakra UI components for dialog functionality
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

// Type definition for delete dialog props
type props = {
  children: ReactNode,
  itemName: string,
  onDelete: (idProduct: number) => void,
  idItem: number
}

/**
 * Delete confirmation dialog component
 * Displays a modal confirmation dialog for deleting items with customizable item name
 * Props:
 *   - children: trigger element that opens the dialog
 *   - itemName: name of the item being deleted (displayed in dialog)
 *   - onDelete: callback function executed when delete is confirmed
 *   - idItem: unique identifier of the item to be deleted
 */
export default function DeleteDialog({ children, itemName, onDelete, idItem }: props) {
  // State to track which dialog is currently open
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null)
  
  return (
    <Dialog.Root
      placement="center"
      open={openPopoverId === idItem}
      onOpenChange={(e) => {
        if (e.open) setOpenPopoverId(idItem)
        else setOpenPopoverId(null)
      }}
    >
      {/* Trigger element that opens the dialog */}
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {/* Dialog header with delete confirmation title */}
            <Dialog.Header>
              <Dialog.Title>Delete {itemName}</Dialog.Title>
            </Dialog.Header>
            {/* Dialog body with confirmation message */}
            <Dialog.Body>
              <p>
                Are you sure you want to delete this {itemName}?
                This action cannot be undone.
              </p>
            </Dialog.Body>
            {/* Dialog footer with action buttons */}
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              {/* Delete button that executes the onDelete callback */}
              <Button
                colorPalette={"red"}
                onClick={() => {
                  onDelete(idItem)
                }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            {/* Close button for dismissing the dialog */}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}