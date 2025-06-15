
import { Size } from "@/types";

export const mockCategories = [];

export const mockProducts = [];

export const mockCustomers = [
  {
    id: "cust1",
    name: "John Smith",
    phone: "+1234567890",
    taxNumber: "123456",
    commercialRegister: "CR123456",
    address: "123 Main St, City"
  },
  {
    id: "cust2",
    name: "Sarah Johnson",
    phone: "+9876543210",
    taxNumber: "654321",
    commercialRegister: "CR654321",
    address: "456 Oak Ave, Town"
  },
  {
    id: "cust3",
    name: "محمد أحمد",
    phone: "+966512345678",
    taxNumber: "789012",
    commercialRegister: "CR789012",
    address: "شارع الملك فهد، الرياض"
  }
];

export const sizeLabels = {
  small: {
    en: "Small",
    ar: "صغير"
  },
  regular: {
    en: "Regular",
    ar: "عادي"
  },
  large: {
    en: "Large",
    ar: "كبير"
  }
};
