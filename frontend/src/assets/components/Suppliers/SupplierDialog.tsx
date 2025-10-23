import DialogChakra from "../DialogChakra"
import CrossIcon from "@/assets/utils/icons/CrossIcon"
import SupplierForm from "./SupplierForm"
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext"

export default function SupplierDialog({ handleForm }: { handleForm: any }) {
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
