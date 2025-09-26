import { Portal, Select, createListCollection } from "@chakra-ui/react"
type CategoryValue = "all" | "electronics" | "clothing" | "homeAndGarden" | "sports";

type Array = {
  label: string;
  value: CategoryValue;
}
export default function SelectChakra ({array}: {array: Array[]}) {
  const frameworks = createListCollection({
    items: array,
  })

    return (
        <Select.Root collection={frameworks} size="md" width="320px" defaultValue={["all"]}>
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
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
    )
}