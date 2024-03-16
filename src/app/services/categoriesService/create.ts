import { httpClient } from "../httpClient";

export interface CategoryParams {
  name: string;
  type: "INCOME" | "EXPENSE";
  icon?: string;
}

export async function create(params: CategoryParams) {
  const { data } = await httpClient.post("/category/register", params);

  return data;
}
