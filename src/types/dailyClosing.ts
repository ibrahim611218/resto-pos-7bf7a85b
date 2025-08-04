export interface DailyClosing {
  id: string;
  date: string;
  openingCash: number;
  totalSales: number;
  cashSales: number;
  cardSales: number;
  totalExpenses: number;
  expectedCash: number;
  actualCash: number;
  cashDifference: number;
  closedBy: string;
  closedAt: string;
  status: 'open' | 'closed';
  transactions: Transaction[];
  expenses: Expense[];
}

export interface Transaction {
  id: string;
  type: 'cash' | 'card';
  amount: number;
  timestamp: string;
  description?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  timestamp: string;
  addedBy: string;
}

export interface DailyReport {
  date: string;
  openingCash: number;
  totalSales: number;
  cashSales: number;
  cardSales: number;
  totalExpenses: number;
  expectedCash: number;
  actualCash: number;
  difference: number;
}