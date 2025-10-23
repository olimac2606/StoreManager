import { useCategories } from "@/assets/contexts/CategoriesContext"
import type { Category, NewCategory } from "@/types/product"
import { Input, Popover, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "@chakra-ui/react"
import TrashButton from "../TrashButton"
import EditButton from "../EditButton"
import { toaster } from "@/components/ui/toaster"
import DeleteDialog from "../DeleteDialog"

export default function CategoriesManager() {
  const { categories, setCategories } = useCategories()
  const [categoryName, setCategoryName] = useState("")
  const [createCategory, setCreateCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState(0)
  const [inputEdit, setInputEdit] = useState("")
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null)

  useEffect(() => {
    if (!createCategory || !categoryName.trim()) return

    const addCategory = async () => {
      const newCategory: NewCategory = {
        name: categoryName.trim(),
      }

      try {
        const res = await axios.post("http://localhost:3000/categories/", newCategory)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        toaster.create({
          description: "Category added succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error creating category", error)
        toaster.create({
          description: "There was an error creating category",
          type: "error"
        })
      }

      setCategoryName("")
      setCreateCategory(false)
    }

    addCategory()
  }, [createCategory, categoryName, setCategories])

  useEffect(() => {
    if (inputEdit.trim() === "" || !editCategory) return
    const editCategoryObject: NewCategory = {
      name: inputEdit
    }
    const patchCategory = async () => {
      try {
        await axios.patch(`http://localhost:3000/categories/${editCategoryId}`, editCategoryObject)
        toaster.create({
          description: "Category updated succesfully",
          type: "success"
        })
      } catch (error) {
        console.log("Error updating category", error)
        toaster.create({
          description: "There was an error updating category",
          type: "error"
        })
      }
    }
    patchCategory()

    setInputEdit("")
    setEditCategoryId(0)
    setEditCategory(false)
  }, [editCategory])

  const onDelete = (categoryId: number) => {
    const deleteCategory = async () => {
      try {
        const res = await axios.delete(`http://localhost:3000/categories/${categoryId}`)
        if (res.data.response) {
          toaster.create({
            description: res.data.response,
            type: "error"
          })
          return
        }
        toaster.create({
          description: "Category delete succesfully",
          type: "warning"
        })
      } catch (error) {
        console.log("Error deleting category", error)
        toaster.create({
          description: "There was an error deleting category",
          type: "error"
        })
      }
    }

    deleteCategory()
  }

  const onEdit = (category: Category) => {
    setInputEdit(category.name)
    setEditCategoryId(category.id)
  }

  return (
    <div>
      <div className="flex flex-col gap-[0.8rem]">
        <span>Type a category name and press Enter to add it.</span>
        <Input
          placeholder="New category..."
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              setCreateCategory(true)
            }
          }}
        />
      </div>

      <Table.Root>
        <Table.Caption />
        <Table.Body>
          {categories.map((category, i) => (
            <Table.Row key={i}>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-[10px] justify-end">
                  <Popover.Root
                    open={openPopoverId === category.id}
                    onOpenChange={(e) => {
                      if (e.open) setOpenPopoverId(category.id)
                      else setOpenPopoverId(null)
                    }}
                  >
                    <Popover.Trigger asChild>
                      <span onClick={() => onEdit(category)}>
                        <EditButton />
                      </span>
                    </Popover.Trigger>
                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                          <Popover.Title fontWeight="medium">Edit Category</Popover.Title>
                          <Text my="4">
                            Edit the category name and press Enter to save.
                          </Text>
                          <Input
                            onChange={(e) => setInputEdit(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                setEditCategory(true)
                                setOpenPopoverId(null)
                              }
                            }}
                            size="sm"
                            defaultValue={inputEdit}
                          />
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Popover.Root>
                  <DeleteDialog itemName={category.name} onDelete={onDelete} idItem={category.id}>
                    <span>
                      <TrashButton />
                    </span>
                  </DeleteDialog>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}