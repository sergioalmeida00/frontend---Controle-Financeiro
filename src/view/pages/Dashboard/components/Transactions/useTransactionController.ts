import { useState } from "react";
import { useDashboard } from "../Context/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { transactions, isLoading,isInitialLoading } = useTransactions();

  console.log({ transactions });

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
  };
}
