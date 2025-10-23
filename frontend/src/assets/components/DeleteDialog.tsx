import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
type props = {
  children: ReactNode,
  itemName: string,
  onDelete: (idProduct: number) => void,
  idItem: number
}

export default function DeleteDialog({ children, itemName, onDelete, idItem }: props) {
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
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete {itemName}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Are you sure you want to delete this {itemName}?
                This action cannot be undone.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette={"red"}
                onClick={() => {
                  onDelete(idItem)
                }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}