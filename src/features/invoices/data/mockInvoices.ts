
import { Invoice } from "@/types";

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-20240601-001",
    date: new Date("2024-06-01"),
    items: [
      {
        id: "item-1",
        productId: "1",
        name: "Cappuccino",
        nameAr: "كابتشينو",
        variantId: "1-m",
        size: "medium",
        price: 30,
        quantity: 2,
        taxable: true,
      },
      {
        id: "item-2",
        productId: "2",
        name: "Latte",
        nameAr: "لاتيه",
        variantId: "2-s",
        size: "small",
        price: 40,
        quantity: 1,
        taxable: true,
      }
    ],
    subtotal: 100,
    taxAmount: 15,
    total: 115,
    paidAmount: 115, // Added paidAmount
    paymentMethod: "Cash",
    customer: {
      id: "cust-1",
      name: "Walk-in Customer",
      phone: ""
    },
    cashierId: "1",
    cashierName: "Ahmed Hassan",
    status: "completed"
  },
  {
    id: "2",
    number: "INV-20240601-002",
    date: new Date("2024-06-01"),
    items: [
      {
        id: "item-3",
        productId: "3",
        name: "Espresso",
        nameAr: "اسبريسو",
        variantId: "3-s",
        size: "small",
        price: 15,
        quantity: 3,
        taxable: true,
      }
    ],
    subtotal: 45,
    taxAmount: 6.75,
    total: 51.75,
    paidAmount: 51.75, // Added paidAmount
    paymentMethod: "Card",
    cashierId: "1",
    cashierName: "Ahmed Hassan",
    status: "completed"
  },
  {
    id: "3",
    number: "INV-20240602-001",
    date: new Date("2024-06-02"),
    items: [
      {
        id: "item-4",
        productId: "1",
        name: "Cappuccino",
        nameAr: "كابتشينو",
        variantId: "1-l",
        size: "large",
        price: 45,
        quantity: 1,
        taxable: true,
      },
      {
        id: "item-5",
        productId: "4",
        name: "Mocha",
        nameAr: "موكا",
        variantId: "4-m",
        size: "medium",
        price: 25,
        quantity: 2,
        taxable: true,
      }
    ],
    subtotal: 95,
    taxAmount: 14.25,
    total: 109.25,
    paidAmount: 109.25, // Added paidAmount
    paymentMethod: "Cash",
    cashierId: "2",
    cashierName: "Fatima Ali",
    status: "completed"
  },
  {
    id: "4",
    number: "INV-20240602-002",
    date: new Date("2024-06-02"),
    items: [
      {
        id: "item-6",
        productId: "5",
        name: "Tea",
        nameAr: "شاي",
        variantId: "5-m",
        size: "medium",
        price: 15,
        quantity: 4,
        taxable: true,
      }
    ],
    subtotal: 60,
    taxAmount: 9,
    total: 69,
    paidAmount: 69, // Added paidAmount
    paymentMethod: "Cash",
    cashierId: "2",
    cashierName: "Fatima Ali",
    status: "refunded"
  },
  {
    id: "5",
    number: "INV-20240603-001",
    date: new Date("2024-06-03"),
    items: [
      {
        id: "item-7",
        productId: "2",
        name: "Latte",
        nameAr: "لاتيه",
        variantId: "2-l",
        size: "large",
        price: 60,
        quantity: 2,
        taxable: true,
      },
      {
        id: "item-8",
        productId: "3",
        name: "Espresso",
        nameAr: "اسبريسو",
        variantId: "3-m",
        size: "medium",
        price: 20,
        quantity: 1,
        taxable: true,
      }
    ],
    subtotal: 140,
    taxAmount: 21,
    total: 161,
    paidAmount: 161, // Added paidAmount
    paymentMethod: "Card",
    customer: {
      id: "cust-2",
      name: "Mohammad Khalid",
      phone: "+966 55 123 4567",
      email: "mohammad@example.com"
    },
    cashierId: "1",
    cashierName: "Ahmed Hassan",
    status: "completed"
  }
];
