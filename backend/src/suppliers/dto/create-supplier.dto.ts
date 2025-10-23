/**
 * Data Transfer Object for creating new suppliers
 * Defines the required fields when adding a new supplier/vendor to the system
 */
export class CreateSupplierDto {
  // Official company or business name
  companyName: string;
  
  // Name of the primary contact person
  contactName: string;
  
  // Email address for business communications
  email: string;
  
  // Phone number for direct contact
  phone: string;
}
