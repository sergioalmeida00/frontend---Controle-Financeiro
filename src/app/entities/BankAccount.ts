export interface BankAccount {
  id: string;
  name: string;
  initial_balance: number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
  currentBalance: number;
  goal: number;
  currentGoal?: number;
}
