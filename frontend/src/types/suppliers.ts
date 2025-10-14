export type Supplier = {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SupplierPayload = {
  id?: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
};
