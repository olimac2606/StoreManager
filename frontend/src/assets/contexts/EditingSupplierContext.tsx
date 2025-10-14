import React, { createContext, useState } from 'react';

type Supplier = {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
};

type EditingSupplierContextValue = {
  editingSupplier: Supplier | null;
  setEditingSupplier: React.Dispatch<React.SetStateAction<Supplier | null>>;
};

export const EditingSupplierContext =
  createContext<EditingSupplierContextValue | undefined>(undefined);

export default function EditingSupplierContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const value: EditingSupplierContextValue = { editingSupplier, setEditingSupplier };

  return (
    <EditingSupplierContext.Provider value={value}>
      {children}
    </EditingSupplierContext.Provider>
  );
}

export function useEditingSupplier() {
  const ctx = React.useContext(EditingSupplierContext);
  if (ctx) return ctx;
  const [editingSupplier, setEditingSupplier] = React.useState<Supplier | null>(null);
  return { editingSupplier, setEditingSupplier } as EditingSupplierContextValue;
}