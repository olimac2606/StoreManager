import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"
import React, { useState, cloneElement, useEffect } from "react"

type DialogProps = {
    buttonText: string,
    children: ReactNode,
    buttonStyles: string,
    dialogTitle: string,
    saveButtonStyles: string,
    idOnEdit: number,
}

export default function DialogChakra({ buttonText, children, buttonStyles, dialogTitle, saveButtonStyles, idOnEdit }: DialogProps) {
    const items = React.Children.toArray(children)
    console.log(idOnEdit)
    const [open, setOpen] = useState(false)
    const [idEditProduct, setIdEditProduct] = useState(idOnEdit)

    const body = cloneElement(items[1] as React.ReactElement<any>, {
        onSubmitted: () => setOpen(false),
        formId: "productForm",
        idOnEdit: idEditProduct !== 0 ? idEditProduct : undefined,
    })

    useEffect(() => {
        if (idOnEdit !== 0) {
            setOpen(true)
        }
    }), [idOnEdit]

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
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