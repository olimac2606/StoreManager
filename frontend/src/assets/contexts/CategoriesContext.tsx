import React, { createContext, useState } from "react"
import type { Category } from "@/types/product"

type CategoriesCtx = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export const CategoriesContext = createContext<CategoriesCtx | undefined>(undefined)

export default function CategoriesContextProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const value = { categories, setCategories }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const ctx = React.useContext(CategoriesContext);
  if (!ctx) throw new Error("useCategories debe usarse dentro de <CategoriesContextProvider>");
  return ctx;
}