// React core imports for context creation and state management
import React, { createContext, useState } from "react";
import type { Product } from "@/types/product";

// Type definition for editing product context value
type EditingProductContextValue = {
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

// Create editing product context for managing product editing state
export const EditingProductContext = createContext<EditingProductContextValue | undefined>(undefined);

/**
 * Editing product context provider component
 * Manages global state for the currently editing product across the application
 */
export default function EditingProductContextProvider({
  children,
}: { children: React.ReactNode }) {
  // State for managing the currently editing product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const value = { editingProduct, setEditingProduct };
  
  return (
    <EditingProductContext.Provider value={value}>
      {children}
    </EditingProductContext.Provider>
  );
}

/**
 * Custom hook to access editing product context
 * Provides editing product state and setter function with fallback
 */
export function useEditingProduct() {
  const ctx = React.useContext(EditingProductContext);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  return ctx ?? { editingProduct, setEditingProduct };
}
