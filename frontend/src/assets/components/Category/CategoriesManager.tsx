// Context hook and type definitions
import { useCategories } from "@/assets/contexts/CategoriesContext"
import type { Category, NewCategory } from "@/types/product"

// Chakra UI components for form and table handling
import { Input, Popover, Text } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"

// HTTP client and React hooks
import axios from "axios"
import { useEffect, useState } from "react"

// Action button components and utilities
import TrashButton from "../TrashButton"
import EditButton from "../EditButton"
import { toaster } from "@/components/ui/toaster"
import DeleteDialog from "../DeleteDialog"

/**
 * Categories manager component for CRUD operations on product categories
 * Provides interface for creating, editing, and deleting categories with API integration
 * Manages category state and handles all category-related operations
 */
export default function CategoriesManager() {
  // Context hook for categories state management
  const { categories, setCategories } = useCategories()
  
  // State for new category creation
  const [categoryName, setCategoryName] = useState("")
  const [createCategory, setCreateCategory] = useState(false)
  
  // State for category editing
  const [editCategory, setEditCategory] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState(0)
  const [inputEdit, setInputEdit] = useState("")
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null)

  // Handle category creation with API call and user feedback
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

  // Handle category updates with API call and user feedback
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

  // Handle category deletion with API call and user feedback
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

  // Handle category editing initialization
  const onEdit = (category: Category) => {
    setInputEdit(category.name)
    setEditCategoryId(category.id)
  }

  return (
    <div>
      {/* Category creation form */}
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

      {/* Categories table with edit and delete actions */}
      <Table.Root>
        <Table.Caption />
        <Table.Body>
          {categories.map((category, i) => (
            <Table.Row key={i}>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-[10px] justify-end">
                  {/* Edit category popover */}
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
                  
                  {/* Delete category dialog */}
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