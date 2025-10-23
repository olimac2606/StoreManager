// Chakra UI components for select functionality
import { Select, createListCollection } from "@chakra-ui/react";
import type { Category } from "@/types/product";

// Type definition for select component props
type Props = {
  option?: Category[];
  onChangeCategory?: (category: string) => void;
  defaultValue?: string;
};

/**
 * Category select component using Chakra UI
 * Provides a dropdown selection for product categories with customizable options
 * Props:
 *   - option: array of Category objects to display in the dropdown
 *   - onChangeCategory: callback function triggered when selection changes
 *   - defaultValue: initial selected value
 */
export default function SelectChakra({ option = [], onChangeCategory, defaultValue }: Props) {
  // Create collection from category options for Chakra UI select
  const categories = createListCollection({
    items: option.map((cat) => ({
      value: String(cat.id),
      label: cat.name,
    })),
  });

  return (
    <Select.Root
      collection={categories}
      size="md"
      className="w-full"
      defaultValue={defaultValue ? [defaultValue] : []}
      onValueChange={(e) => {
        const v = e.value[0];
        onChangeCategory?.(v);
      }}
    >
      {/* Hidden select for form submission */}
      <Select.HiddenSelect name="category" />
      
      {/* Select control with trigger and indicator */}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Category" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      {/* Dropdown content with category options */}
      <Select.Positioner zIndex={1700}>
        <Select.Content>
          {categories.items.map((cat) => (
            <Select.Item item={cat} key={cat.value}>
              {cat.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
