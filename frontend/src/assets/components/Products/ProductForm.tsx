// Chakra UI components for form handling
import { Field, Input, Stack, NumberInput } from "@chakra-ui/react"
import SelectChakra from "../SelectChakra"

// Type definitions and context hooks
import type { ProductFormType } from "@/types/product"
import { useEditingProduct } from "@/assets/contexts/EditingProductContext"
import { useCategories } from "@/assets/contexts/CategoriesContext"

// Type definition for product form props
type Props = {
  handleForm: (dataForm: ProductFormType) => void
  onSubmitted?: () => void
  formId?: string
}

/**
 * Product form component for creating and editing products
 * Handles form submission with validation and context-aware editing
 * Props:
 *   - handleForm: callback function for form submission with product data
 *   - onSubmitted: optional callback triggered after successful submission
 *   - formId: HTML form ID for form submission
 */
export default function ProductForm({
  handleForm,
  onSubmitted,
  formId,
}: Props) {

  // Context hooks for editing state and categories
  const { editingProduct } = useEditingProduct()
  const { categories } = useCategories()

  // Initialize form values from editing product or defaults
  const initialName = editingProduct?.name ?? ""
  const initialPrice = editingProduct?.price ?? 0
  const initialStock = editingProduct?.stock ?? 0
  const defaultCategoryValue = editingProduct?.categoryId ?? undefined

  // Handle form submission with data extraction and validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload: ProductFormType = {
      ...(editingProduct ? { id: editingProduct.id } : {}),
      name: String(fd.get("name") ?? "").trim(),
      categoryId: Number(fd.get("category")),
      price: Number(fd.get("price") ?? 0),
      stock: Number(fd.get("stock") ?? 0),
    }

    handleForm(payload)
    onSubmitted?.()
    e.currentTarget.reset()
  }

  // Prevent form submission on Enter key press
  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault()
  }

  return (
    <form id={formId} onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}>
      <Stack>
        {/* Product name input field */}
        <Field.Root>
          <Field.Label>Product Name</Field.Label>
          <Input name="name" defaultValue={initialName} />
        </Field.Root>

        {/* Category selection dropdown */}
        <Field.Root>
          <Field.Label>Select Category</Field.Label>
          <SelectChakra option={categories} defaultValue={String(defaultCategoryValue)} />
        </Field.Root>

        {/* Price input with number validation */}
        <Field.Root>
          <Field.Label>Price</Field.Label>
          <NumberInput.Root
            name="price"
            defaultValue={`${initialPrice}`}
            className="w-full"
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        </Field.Root>

        {/* Stock quantity input with number validation */}
        <Field.Root>
          <Field.Label>Stock</Field.Label>
          <NumberInput.Root
            name="stock"
            defaultValue={`${initialStock}`}
            className="w-full"
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        </Field.Root>
      </Stack>
    </form>
  )
}
