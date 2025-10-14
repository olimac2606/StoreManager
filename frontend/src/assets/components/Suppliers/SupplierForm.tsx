import { Stack, Input, Field } from "@chakra-ui/react";
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext";

type SupplierPayload = {
    id?: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
};

export default function SupplierForm({ onSubmitted, formId, handleForm }: { onSubmitted?: () => void, formId: string, handleForm: (data: SupplierPayload) => void }) {

    const { editingSupplier } = useEditingSupplier()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget);
        const payload = {
            id: editingSupplier?.id,
            companyName: String(fd.get("companyName") ?? "").trim(),
            contactPerson: String(fd.get("contactPerson") ?? "").trim(),
            email: String(fd.get("email") ?? "").trim(),
            phone: String(fd.get("phone") ?? "").trim(),
        };
        handleForm(payload);
        onSubmitted?.()
        e.currentTarget.reset()
    }
    return (
        <form id={formId} onSubmit={handleSubmit}>
            <Stack>
                <Field.Root>
                    <Field.Label>Company Name</Field.Label>
                    <Input defaultValue={editingSupplier?.name} name="companyName" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Contact Person</Field.Label>
                    <Input defaultValue={editingSupplier?.contact} name="contactPerson" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input defaultValue={editingSupplier?.email} type="email" name="email" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Phone</Field.Label>
                    <Input defaultValue={editingSupplier?.phone} type="tel" name="phone" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>
            </Stack>
        </form>
    )
}