import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"
import React, { cloneElement, useState } from "react"
import { useEditingProduct } from "../contexts/EditingProductContext"
import { useEditingSupplier } from "../contexts/EditingSupplierContext"

type DialogProps = {
    buttonText: string,
    children: ReactNode,
    buttonStyles: string,
    dialogTitle: string,
    saveButtonStyles: string,
    formId: string,
}

export default function DialogChakra({ buttonText, children, buttonStyles, dialogTitle, saveButtonStyles, formId}: DialogProps) {
    const items = React.Children.toArray(children)
    const [localOpen, setLocalOpen] = useState(false);
    const {editingProduct, setEditingProduct} = useEditingProduct()
    const {editingSupplier, setEditingSupplier} = useEditingSupplier()
    let open = localOpen || editingProduct !== null || editingSupplier !== null
    const body = cloneElement(items[1] as React.ReactElement<any>, {
        onSubmitted: () => {
            setLocalOpen(false);
            setEditingProduct(null);
            setEditingSupplier(null);
        },
        formId: formId,
    })
    return (
        <Dialog.Root open={open} onOpenChange={(e) => {
            setLocalOpen(e.open);
            if (!e.open){
                setEditingProduct(null)
                setEditingSupplier(null) 
            } 
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
                            <Button type="submit" form={formId} className={saveButtonStyles}>Save</Button>
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