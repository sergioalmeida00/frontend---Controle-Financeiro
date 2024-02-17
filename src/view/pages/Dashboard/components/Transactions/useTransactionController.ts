import { useDashboard } from "../Context/useDashboard";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isInitialLoading:false,
    isLoading: false,
    transactions: [],
  };
}
