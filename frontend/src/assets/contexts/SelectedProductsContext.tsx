// React core imports for context creation and state management
import React, { createContext, useState } from "react";
import type { Product } from "@/types/product";

// Type definition for selected products context value
type SelectedProductsCtx = {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

// Create selected products context for managing shopping cart state
export const SelectedProductsContext = createContext<SelectedProductsCtx | undefined> (undefined);

/**
 * Selected products context provider component
 * Manages global state for products selected in the shopping cart across the application
 */
export default function SelectedProductsContextProvider ({children}: {children: React.ReactNode}) {
    // State for managing selected products in the cart
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const value = {selectedProducts, setSelectedProducts}
    
    return (
        <SelectedProductsContext.Provider value={value}>{children}</SelectedProductsContext.Provider>
    )
}

/**
 * Custom hook to access selected products context
 * Provides selected products state and setter function with error handling
 */
export function useSelectedProducts() {
  const ctx = React.useContext(SelectedProductsContext);
  if (!ctx) throw new Error("useSelectedProducts debe usarse dentro de <SelectedProductsContextProvider>");
  return ctx;
}