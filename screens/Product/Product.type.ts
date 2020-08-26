export type Product = {
  sku: string;
  categoryId: number;
  name: string;
  description?: string;
  photoUri?: string;
  alertQuantity?: number;
  sellingPrice?: number;
  units: number;
  createdDate?: string;
  updated?: string;
  quantity: number;
};
