import { Portal, Select, createListCollection } from "@chakra-ui/react"
type CategoryValue = "all" | "electronics" | "clothing" | "homeAndGarden" | "sports";

type Array = {
  label: string;
  value: CategoryValue;
}
export default function SelectChakra({ array, onChangeCategory }: { array: Array[], onChangeCategory: (category: CategoryValue) => void }) {
  const categories = createListCollection({
    items: array,
  })

  return (
    <Select.Root
      collection={categories}
      size="md"
      width="320px"
      defaultValue={["all"]}
      onValueChange={(e) => {
        onChangeCategory(e.value[0] as CategoryValue)
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="All Categories" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {categories.items.map((category) => (
              <Select.Item item={category} key={category.value}>
                {category.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}