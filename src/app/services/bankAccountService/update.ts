import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initial_balance: string | number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`bank-account/update/${id}`, params);

  return data;
}
