import { httpClient } from "../httpClient";

export interface BankAccountParams {
  name: string;
  initial_balance: string | number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
  goal?: string | number;
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post("bank-account/register", params);

  return data;
}
