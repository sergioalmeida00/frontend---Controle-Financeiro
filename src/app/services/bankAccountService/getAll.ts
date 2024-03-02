import { httpClient } from "../httpClient";

type BankAccountResponse = Array<{
  id: string;
  name: string;
  initial_balance: number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
  currentBalance: number;
}>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountResponse>(
    "/bank-account/list"
  );

  return data;
}
