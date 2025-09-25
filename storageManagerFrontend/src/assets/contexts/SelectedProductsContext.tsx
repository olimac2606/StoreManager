import React, { createContext, useState } from "react";
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  amount: number;
};

type SelectedProductsCtx = {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const SelectedProductsContext = createContext<SelectedProductsCtx | undefined> (undefined);

export default function SelectedProductsContextProvider ({children}: {children: React.ReactNode}) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const value = {selectedProducts, setSelectedProducts}
    return (
        <SelectedProductsContext.Provider value={value}>{children}</SelectedProductsContext.Provider>
    )
}

export function useSelectedProducts() {
  const ctx = React.useContext(SelectedProductsContext);
  if (!ctx) throw new Error("useSelectedProducts debe usarse dentro de <SelectedProductsContextProvider>");
  return ctx;
}