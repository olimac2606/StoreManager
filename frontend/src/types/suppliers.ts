/**
 * Type definitions for supplier management
 * Defines data structures for supplier/vendor information
 */

// Supplier type representing vendor information with timestamps
export type Supplier = {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  createdAt?: Date; // Optional creation timestamp
  updatedAt?: Date; // Optional update timestamp
};

// Supplier payload type for API requests (ID optional for creation)
export type SupplierPayload = {
  id?: number; // Optional ID for updates
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
};
