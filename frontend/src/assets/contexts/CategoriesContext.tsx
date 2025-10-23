// React core imports for context creation and state management
import React, { createContext, useState } from "react"
import type { Category } from "@/types/product"

// Type definition for categories context value
type CategoriesCtx = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

// Create categories context for global category state management
export const CategoriesContext = createContext<CategoriesCtx | undefined>(undefined)

/**
 * Categories context provider component
 * Manages global state for product categories across the application
 */
export default function CategoriesContextProvider({ children }: { children: React.ReactNode }) {
  // State for managing categories list
  const [categories, setCategories] = useState<Category[]>([])
  const value = { categories, setCategories }
  
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

/**
 * Custom hook to access categories context
 * Provides categories state and setter function with error handling
 */
export function useCategories() {
  const ctx = React.useContext(CategoriesContext);
  if (!ctx) throw new Error("useCategories debe usarse dentro de <CategoriesContextProvider>");
  return ctx;
}