// React core imports for context creation and state management
import React, { createContext, useState } from 'react';
import type { Supplier } from '@/types/suppliers';

// Type definition for editing supplier context value
type EditingSupplierContextValue = {
  editingSupplier: Supplier | null;
  setEditingSupplier: React.Dispatch<React.SetStateAction<Supplier | null>>;
};

// Create editing supplier context for managing supplier editing state
export const EditingSupplierContext =
  createContext<EditingSupplierContextValue | undefined>(undefined);

/**
 * Editing supplier context provider component
 * Manages global state for the currently editing supplier across the application
 */
export default function EditingSupplierContextProvider({
  children,
}: { children: React.ReactNode }) {
  // State for managing the currently editing supplier
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const value: EditingSupplierContextValue = { editingSupplier, setEditingSupplier };

  return (
    <EditingSupplierContext.Provider value={value}>
      {children}
    </EditingSupplierContext.Provider>
  );
}

/**
 * Custom hook to access editing supplier context
 * Provides editing supplier state and setter function with fallback
 */
export function useEditingSupplier() {
  const ctx = React.useContext(EditingSupplierContext);
  if (ctx) return ctx;
  const [editingSupplier, setEditingSupplier] = React.useState<Supplier | null>(null);
  return { editingSupplier, setEditingSupplier } as EditingSupplierContextValue;
}