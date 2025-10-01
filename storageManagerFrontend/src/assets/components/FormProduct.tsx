import { Field, Input, Stack, NumberInput } from "@chakra-ui/react"
import SelectChakra from "./SelectChakra"
import type { Option, ProductForm, Product } from "@/types/product";
import { useEditingProduct } from "../contexts/EditingProductContext";
import { isCategoryLabel, isCategoryKey, labelToValue, type CategoryKey, } from "@/types/categories"

type Props = {
    handleForm: (dataForm: ProductForm) => void;
    onSubmitted?: () => void;
    formId?: string;
    currentProducts: Product[];
}

export default function FormProduct({ handleForm, onSubmitted, formId, currentProducts }: Props) {

    const options: Option[] = [
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Home & Garden", value: "homeAndGarden" },
        { label: "Sports", value: "sports" },
    ]

    const {editingProduct } = useEditingProduct()

    const initialName = editingProduct?.name ?? "";
    const initialPrice = editingProduct?.price ?? 0;
    const initialStock = editingProduct?.stock ?? 0;
    const defaultCategoryValue: CategoryKey | undefined = isCategoryLabel(
        editingProduct?.category
    )
        ? labelToValue(editingProduct!.category)
        : undefined;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget);
        const catRaw = fd.get("category");
        if (!isCategoryKey(catRaw)) {
            console.log(catRaw)
            return;
        }
        const payload: ProductForm = {
            id: editingProduct?.id ?? Math.max(0, ...currentProducts.map(p => p.id)) + 1,
            name: String(fd.get("name") ?? "").trim(),
            category: catRaw,
            price: Number(fd.get("price") ?? 0),
            stock: Number(fd.get("stock") ?? 0),
        };

        handleForm(payload);
        onSubmitted?.()
        e.currentTarget.reset()
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <Stack>
                <Field.Root>
                    <Field.Label>Product Name</Field.Label>
                    <Input name="name" defaultValue={initialName}/>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Select Category</Field.Label>
                    <SelectChakra option={options} defaultValue={defaultCategoryValue} />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Price</Field.Label>
                    <NumberInput.Root name="price" defaultValue={`${initialPrice}`} className="w-full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Stock</Field.Label>
                    <NumberInput.Root name="stock" defaultValue={`${initialStock}`} className="w-full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>
            </Stack>
        </form>
    )
}