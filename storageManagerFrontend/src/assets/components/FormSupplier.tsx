import { Stack, Input, Field } from "@chakra-ui/react";

export default function FormSupplier() {
    return (
        <form action="">
            <Stack>
                <Field.Root>
                    <Field.Label>Company Name</Field.Label>
                    <Input name="companyName" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Contact Person</Field.Label>
                    <Input name="contactPerson" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" name="email" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Phone</Field.Label>
                    <Input type="tel" name="phone" />
                    <Field.ErrorText></Field.ErrorText>
                </Field.Root>
            </Stack>
        </form>
    )
}