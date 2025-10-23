// Chakra UI components for form handling
import { Stack, Input, Field } from "@chakra-ui/react";

// Context hook and type definitions
import { useEditingSupplier } from "@/assets/contexts/EditingSupplierContext";
import type { SupplierPayload } from "@/types/suppliers";

/**
 * Supplier form component for creating and editing suppliers
 * Handles form submission with validation and context-aware editing
 * Props:
 *   - onSubmitted: optional callback triggered after successful submission
 *   - formId: HTML form ID for form submission
 *   - handleForm: callback function for form submission with supplier data
 */
export default function SupplierForm({ onSubmitted, formId, handleForm }: { onSubmitted?: () => void, formId: string, handleForm: (data: SupplierPayload) => void }) {

  // Context hook for editing supplier state
  const { editingSupplier } = useEditingSupplier()

  // Handle form submission with data extraction and validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget);
    const payload = {
      id: editingSupplier?.id,
      companyName: String(fd.get("companyName") ?? "").trim(),
      contactName: String(fd.get("contactName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
    };
    handleForm(payload);
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
        {/* Company name input field */}
        <Field.Root>
          <Field.Label>Company Name</Field.Label>
          <Input defaultValue={editingSupplier?.companyName} name="companyName" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        {/* Contact person name input field */}
        <Field.Root>
          <Field.Label>Contact Person</Field.Label>
          <Input defaultValue={editingSupplier?.contactName} name="contactName" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        {/* Email input field with email validation */}
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input defaultValue={editingSupplier?.email} type="email" name="email" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        {/* Phone number input field with tel validation */}
        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Input defaultValue={editingSupplier?.phone} type="tel" name="phone" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>
      </Stack>
    </form>
  )
}