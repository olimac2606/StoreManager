import { Select, createListCollection } from "@chakra-ui/react";
import type { Category } from "@/types/product";

type Props = {
  option?: Category[];
  onChangeCategory?: (category: string) => void;
  defaultValue?: string;
};

export default function SelectChakra({ option = [], onChangeCategory, defaultValue }: Props) {
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
