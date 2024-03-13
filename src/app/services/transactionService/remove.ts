import { httpClient } from "../httpClient";

export async function remove(transactionId: string) {
  const { data } = await httpClient.delete(
    `/transaction/delete/${transactionId}`
  );

  return data;
}
