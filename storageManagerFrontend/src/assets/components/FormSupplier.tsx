import { Stack, Input, Field } from "@chakra-ui/react";

export default function FormSupplier () {
    <form action="">
        <Stack>
            <Field.Root>
                <Field.Label>Product Name</Field.Label>
                <Input name="name" />
                <Field.ErrorText></Field.ErrorText>
            </Field.Root>

        </Stack>
    </form>    
}