import DialogChakra from "../DialogChakra"
import CrossIcon from "@/assets/utils/icons/CrossIcon"
import ProductForm from "./ProductForm"
import { useEditingProduct } from "@/assets/contexts/EditingProductContext"

export default function ProductDialog({ handleForm }: { handleForm: any }) {
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