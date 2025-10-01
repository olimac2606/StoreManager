import React, { createContext, useState } from "react";
import type { Product } from "@/types/product";

type EditingProductContextValue = {
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

export const EditingProductContext = createContext<EditingProductContextValue | undefined>(undefined);

export default function EditingProductContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const value = { editingProduct, setEditingProduct };
  return (
    <EditingProductContext.Provider value={value}>
      {children}
    </EditingProductContext.Provider>
  );
}

export function useEditingProduct() {
  const ctx = React.useContext(EditingProductContext);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  return ctx ?? { editingProduct, setEditingProduct };
}
