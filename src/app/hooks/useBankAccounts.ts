import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccountService";

export function useBankAccount() {
  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity
  });

  return { accounts: data ?? [], isFetching };
}
