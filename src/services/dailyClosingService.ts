import { DailyClosing, Transaction, Expense } from '@/types/dailyClosing';

const DAILY_CLOSING_KEY = 'daily_closing_data';
const CURRENT_SESSION_KEY = 'current_session';

export class DailyClosingService {
  
  // Get current session
  getCurrentSession(): DailyClosing | null {
    try {
      const session = localStorage.getItem(CURRENT_SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error getting current session:', error);
      return null;
    }
  }

  // Start new day session
  startNewSession(openingCash: number, userId: string): DailyClosing {
    const today = new Date().toISOString().split('T')[0];
    
    const newSession: DailyClosing = {
      id: `session_${today}_${Date.now()}`,
      date: today,
      openingCash,
      totalSales: 0,
      cashSales: 0,
      cardSales: 0,
      totalExpenses: 0,
      expectedCash: openingCash,
      actualCash: 0,
      cashDifference: 0,
      closedBy: '',
      closedAt: '',
      status: 'open',
      transactions: [],
      expenses: []
    };

    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));
    return newSession;
  }

  // Add transaction to current session
  addTransaction(transaction: Omit<Transaction, 'id'>): boolean {
    try {
      const session = this.getCurrentSession();
      if (!session || session.status === 'closed') {
        return false;
      }

      const newTransaction: Transaction = {
        ...transaction,
        id: `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      session.transactions.push(newTransaction);
      
      // Update totals
      session.totalSales += transaction.amount;
      if (transaction.type === 'cash') {
        session.cashSales += transaction.amount;
      } else if (transaction.type === 'card') {
        session.cardSales += transaction.amount;
      }
      
      session.expectedCash = session.openingCash + session.cashSales - session.totalExpenses;

      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return false;
    }
  }

  // Add expense to current session
  addExpense(expense: Omit<Expense, 'id'>): boolean {
    try {
      const session = this.getCurrentSession();
      if (!session || session.status === 'closed') {
        return false;
      }

      const newExpense: Expense = {
        ...expense,
        id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      session.expenses.push(newExpense);
      session.totalExpenses += expense.amount;
      session.expectedCash = session.openingCash + session.cashSales - session.totalExpenses;

      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (error) {
      console.error('Error adding expense:', error);
      return false;
    }
  }

  // Close current session
  closeSession(actualCash: number, userId: string): boolean {
    try {
      const session = this.getCurrentSession();
      if (!session || session.status === 'closed') {
        return false;
      }

      session.actualCash = actualCash;
      session.cashDifference = actualCash - session.expectedCash;
      session.closedBy = userId;
      session.closedAt = new Date().toISOString();
      session.status = 'closed';

      // Save to historical data
      this.saveClosedSession(session);
      
      // Clear current session
      localStorage.removeItem(CURRENT_SESSION_KEY);
      
      return true;
    } catch (error) {
      console.error('Error closing session:', error);
      return false;
    }
  }

  // Save closed session to history
  private saveClosedSession(session: DailyClosing): void {
    try {
      const existingData = localStorage.getItem(DAILY_CLOSING_KEY);
      const sessions = existingData ? JSON.parse(existingData) : [];
      sessions.push(session);
      localStorage.setItem(DAILY_CLOSING_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving closed session:', error);
    }
  }

  // Get historical sessions
  getHistoricalSessions(startDate?: string, endDate?: string): DailyClosing[] {
    try {
      const data = localStorage.getItem(DAILY_CLOSING_KEY);
      if (!data) return [];
      
      let sessions: DailyClosing[] = JSON.parse(data);
      
      if (startDate || endDate) {
        sessions = sessions.filter(session => {
          const sessionDate = session.date;
          const afterStart = !startDate || sessionDate >= startDate;
          const beforeEnd = !endDate || sessionDate <= endDate;
          return afterStart && beforeEnd;
        });
      }
      
      return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error getting historical sessions:', error);
      return [];
    }
  }

  // Check if session exists for today
  hasSessionForDate(date: string): boolean {
    const session = this.getCurrentSession();
    return session?.date === date && session?.status === 'open';
  }

  // Get session summary
  getSessionSummary(): { isOpen: boolean; session: DailyClosing | null } {
    const session = this.getCurrentSession();
    return {
      isOpen: session?.status === 'open',
      session
    };
  }
}