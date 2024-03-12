import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  id: string;
  bank_account_id: string;
  category_id: string;
  name: string;
  value: string | number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transaction/update/${id}`, params);

  return data;
}
