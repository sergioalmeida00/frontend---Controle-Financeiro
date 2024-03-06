import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bank_account_id: string;
  category_id: string;
  name: string;
  value: string | number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post("/transaction/register", params);

  return data;
}
