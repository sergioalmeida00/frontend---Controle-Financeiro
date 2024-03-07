import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export function useTransactions() {
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionService.getAll({
        month: 3,
        year: 2024,
      }),
  });

  return { transactions: data ?? [], isLoading: isFetching, isInitialLoading };
}
