import { httpClient } from "../httpClient";

export interface BankAccountParams {
  name: string;
  initial_balance: string;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post("bank-account/register", params);

  return data;
}
