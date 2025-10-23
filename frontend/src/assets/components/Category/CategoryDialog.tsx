// Dialog component and icon imports
import DialogChakra from "../DialogChakra"
import GearIcon from "@/assets/utils/icons/GearIcon"
import CategoriesManager from "./CategoriesManager"

/**
 * Category dialog component for managing product categories
 * Wraps CategoriesManager in a dialog for category CRUD operations
 * Uses special category dialog configuration with custom save behavior
 */
export default function CategoryDialog() {
  return (
    <DialogChakra
      buttonStyles="bg-[#4ADE80]"
      buttonText="Categories"
      dialogTitle="Category Manager"
      saveButtonStyles="bg-[#4ADE80]"
      formId="categoryForm"
      isCategoryDialog={true}
    >
      <GearIcon color="#FFFFFF" size="10" />
      <CategoriesManager />
    </DialogChakra>
  )
}