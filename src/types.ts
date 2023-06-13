export interface ExpenseData {
  date: Date;
  amount: number;
  title: string;
  sectionTitle?: string;
}

export interface ExpensesListData {
  id: string;
  data?: ExpenseData;
}
