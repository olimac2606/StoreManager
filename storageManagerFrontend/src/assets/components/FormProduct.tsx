import { Field, Input, Stack, NumberInput } from "@chakra-ui/react"
import SelectChakra from "./SelectChakra"
import type { Option, ProductForm, CategoryKey } from "@/types/product";

type Props = {
    handleForm: (dataForm: ProductForm) => void;
    onSubmitted?: () => void 
    formId?: string   
}

export default function FormProduct ({ handleForm, onSubmitted, formId }: Props) {

    const options: Option[] = [
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Home & Garden", value: "homeAndGarden" },
        { label: "Sports", value: "sports" },
    ]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget);
        const payload: ProductForm = {
        name: String(fd.get("name") ?? "").trim(),
        category: fd.get("category") as CategoryKey,
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
                    <Input name="name"/>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Product Name</Field.Label>
                    <SelectChakra option={options}/>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Price</Field.Label>
                    <NumberInput.Root name="price" defaultValue="0" className="w-full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Stock</Field.Label>
                    <NumberInput.Root name="stock" defaultValue="0" className="w-full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>
            </Stack>
        </form>
    )
}