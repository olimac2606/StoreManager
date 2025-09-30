import { Select, createListCollection } from "@chakra-ui/react";
import type { CategoryValue, Option } from "@/types/product";

type Props = {
  option: Option[];
  onChangeCategory?: (category: CategoryValue) => void; 
};

export default function SelectChakra({ option, onChangeCategory }: Props) {
  const categories = createListCollection({ items: option });

  return (
    <Select.Root
      collection={categories}
      size="md"
      className="w-full"
      defaultValue={["all"]}
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
