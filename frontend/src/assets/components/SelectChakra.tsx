import { Select, createListCollection } from "@chakra-ui/react";
import type { Option } from "@/types/product";
import type { CategoryKey, CategoryValue } from "@/types/categories";

type Props = {
  option: Option[];
  onChangeCategory?: (category: CategoryValue) => void; 
  defaultValue?: CategoryKey
};

export default function SelectChakra({ option, onChangeCategory, defaultValue }: Props) {
  const categories = createListCollection({ items: option });
  return (
    <Select.Root
      collection={categories}
      size="md"
      className="w-full"
      defaultValue={defaultValue ? [defaultValue] : ["all"]}
      onValueChange={(e) => {
        const v = e.value[0] as CategoryValue;
        onChangeCategory?.(v);
      }}
    >
      <Select.HiddenSelect name="category" />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Category" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner zIndex={1700}>
        <Select.Content>
          {categories.items.map((category) => (
            <Select.Item item={category} key={category.value}>
              {category.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
