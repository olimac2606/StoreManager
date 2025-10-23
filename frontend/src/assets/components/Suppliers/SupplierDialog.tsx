// Dialog and form components for supplier management
import DialogChakra from "../DialogChakra"
import CrossIcon from "@/assets/utils/icons/CrossIcon"
import SupplierForm from "./SupplierForm"

// Context hook for editing supplier state
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext"

/**
 * Supplier dialog component for creating and editing suppliers
 * Wraps SupplierForm in a dialog with context-aware editing support
 * Props:
 *   - handleForm: callback function for form submission with supplier data
 */
export default function SupplierDialog({ handleForm }: { handleForm: any }) {
  // Get current editing supplier from context
  const { editingSupplier } = useEditingSupplier()
  
  return (
    <DialogChakra
      buttonStyles="bg-[#4ADE80]"
      buttonText="Add Supplier"
      dialogTitle={editingSupplier ? "Edit Supplier" : "Create Supplier"}
      saveButtonStyles="bg-[#4ADE80]"
      formId="supplierForm"
      listenEditingSupplier
    >
      <CrossIcon color="#FFFFFF" size="10" />
      <SupplierForm formId="supplierForm" handleForm={handleForm} />
    </DialogChakra>
  )
}
