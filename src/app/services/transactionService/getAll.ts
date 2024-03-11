import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsResponse = Array<Transaction>;

export type TransactionsFilters = {
  month: number;
  year: number;
  bank_account_id?: string;
  type?: Transaction["type"];
};

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>("/transaction", {
    params: filters,
  });

  return data;
}
