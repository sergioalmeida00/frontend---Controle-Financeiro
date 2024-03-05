import { httpClient } from "../httpClient";

export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete(`/bank-account/delete/${bankAccountId}`);

  return data;
}