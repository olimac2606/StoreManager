import { Field, Input, Stack, NumberInput } from "@chakra-ui/react"
import SelectChakra from "../SelectChakra"
import type { ProductFormType } from "@/types/product"
import { useEditingProduct } from "@/assets/contexts/EditingProductContext"
import { useCategories } from "@/assets/contexts/CategoriesContext"

type Props = {
  handleForm: (dataForm: ProductFormType) => void
  onSubmitted?: () => void
  formId?: string
}

export default function ProductForm({
  handleForm,
  onSubmitted,
  formId,
}: Props) {

  const { editingProduct } = useEditingProduct()
  const { categories } = useCategories()

  const initialName = editingProduct?.name ?? ""
  const initialPrice = editingProduct?.price ?? 0
  const initialStock = editingProduct?.stock ?? 0
  const defaultCategoryValue = editingProduct?.categoryId ?? undefined

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

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault()
  }

  return (
    <form id={formId} onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}>
      <Stack>
        <Field.Root>
          <Field.Label>Product Name</Field.Label>
          <Input name="name" defaultValue={initialName} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Select Category</Field.Label>
          <SelectChakra option={categories} defaultValue={String(defaultCategoryValue)} />
        </Field.Root>

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
