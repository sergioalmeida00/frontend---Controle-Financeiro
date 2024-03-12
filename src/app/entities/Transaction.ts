export interface Transaction {
  id: string;
  name: string;
  category_id: string;
  bank_account_id: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
