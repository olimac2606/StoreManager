// Dialog and form components for product management
import DialogChakra from "../DialogChakra"
import CrossIcon from "@/assets/utils/icons/CrossIcon"
import ProductForm from "./ProductForm"

// Context hook for editing product state
import { useEditingProduct } from "@/assets/contexts/EditingProductContext"

/**
 * Product dialog component for creating and editing products
 * Wraps ProductForm in a dialog with context-aware editing support
 * Props:
 *   - handleForm: callback function for form submission with product data
 */
export default function ProductDialog({ handleForm }: { handleForm: any }) {
  // Get current editing product from context
  const { editingProduct } = useEditingProduct()

  return (
    <DialogChakra
      buttonStyles="bg-[#4ADE80]"
      buttonText="Add Product"
      dialogTitle={`${editingProduct ? 'Edit' : 'Create'} Product`}
      saveButtonStyles="bg-[#4ADE80]"
      formId="productForm"
      listenEditingProduct
    >
      <CrossIcon color="#FFFFFF" size="10" />
      <ProductForm handleForm={handleForm} />
    </DialogChakra>
  )
}