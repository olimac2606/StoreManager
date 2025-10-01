import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"
import React, { cloneElement, useState } from "react"
import { useEditingProduct } from "../contexts/EditingProductContext"

type DialogProps = {
    buttonText: string,
    children: ReactNode,
    buttonStyles: string,
    dialogTitle: string,
    saveButtonStyles: string,
}

export default function DialogChakra({ buttonText, children, buttonStyles, dialogTitle, saveButtonStyles}: DialogProps) {
    const items = React.Children.toArray(children)
    const [localOpen, setLocalOpen] = useState(false);
    const {editingProduct, setEditingProduct} = useEditingProduct()
    let open = localOpen || editingProduct !== null
    const body = cloneElement(items[1] as React.ReactElement<any>, {
        onSubmitted: () => {
            setLocalOpen(false);
            setEditingProduct(null);
        },
        formId: "productForm",
    })

    return (
        <Dialog.Root open={open} onOpenChange={(e) => {
            setLocalOpen(e.open);
            if (!e.open) setEditingProduct(null) 
        }}>
            <Dialog.Trigger asChild>
                <Button size="sm" className={buttonStyles}>
                    {items[0]}
                    {buttonText}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{dialogTitle}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {body}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type="submit" form="productForm" className={saveButtonStyles}>Save</Button>
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