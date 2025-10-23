// Chakra UI components for dialog functionality
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"
import React, { cloneElement, useState } from "react"

// Context hooks for editing state management
import { useEditingProduct } from "../contexts/EditingProductContext"
import { useEditingSupplier } from "../contexts/EditingSupplierContext"

// Type definition for dialog component props
type DialogProps = {
  buttonText: string,
  children: ReactNode,
  buttonStyles: string,
  dialogTitle: string,
  saveButtonStyles: string,
  formId: string,
  listenEditingProduct?: boolean
  listenEditingSupplier?: boolean
  isCategoryDialog?: boolean
}

/**
 * Generic dialog component with context-aware editing support
 * Manages dialog state and integrates with editing contexts for products and suppliers
 * Props:
 *   - buttonText: text displayed on the trigger button
 *   - children: ReactNode containing trigger and form content
 *   - buttonStyles: CSS classes for button styling
 *   - dialogTitle: title displayed in dialog header
 *   - saveButtonStyles: CSS classes for save button styling
 *   - formId: HTML form ID for form submission
 *   - listenEditingProduct: whether to open dialog when editing a product
 *   - listenEditingSupplier: whether to open dialog when editing a supplier
 *   - isCategoryDialog: whether this is a category dialog (affects save button display)
 */
export default function DialogChakra({
  buttonText,
  children,
  buttonStyles,
  dialogTitle,
  saveButtonStyles,
  formId,
  listenEditingProduct = false,
  listenEditingSupplier = false,
  isCategoryDialog = false
}: DialogProps) {
  // Convert children to array for accessing trigger and form elements
  const items = React.Children.toArray(children)
  
  // Local state for dialog open/close
  const [localOpen, setLocalOpen] = useState(false);
  
  // Context hooks for editing state management
  const { editingProduct, setEditingProduct } = useEditingProduct()
  const { editingSupplier, setEditingSupplier } = useEditingSupplier()
  
  // Determine if dialog should be open based on local state or editing contexts
  const open = localOpen || (listenEditingProduct && editingProduct !== null) || (listenEditingSupplier && editingSupplier !== null)
  
  // Clone form element with submission handler and form ID
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
      if (!e.open) {
        setEditingProduct(null)
        setEditingSupplier(null)
      }
    }}>
      {/* Dialog trigger button */}
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
            {/* Dialog header with title */}
            <Dialog.Header>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
            </Dialog.Header>
            {/* Dialog body containing the form */}
            <Dialog.Body>
              {body}
            </Dialog.Body>
            {/* Dialog footer with action buttons */}
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              {/* Save button (hidden for category dialogs) */}
              {!isCategoryDialog && (
                <Button type="submit" form={formId} className={saveButtonStyles}>Save</Button>
              )}
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