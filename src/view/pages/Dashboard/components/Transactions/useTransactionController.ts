import { useEffect, useState } from "react";
import { useDashboard } from "../Context/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionEdited, setTransactionEditedEdited] =
    useState<null | Transaction>(null);

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleChangeMonth(month: number) {
    setFilters((prevState) => ({
      ...prevState,
      month,
    }));
  }

  function handleApplyFilters({
    bank_account_id,
    year,
  }: {
    bank_account_id: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bank_account_id")(bank_account_id);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionEditedEdited(transaction);
  }

  function handleCloseModal() {
    setIsEditModalOpen(false);
    setTransactionEditedEdited(null);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeMonth,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    transactionEdited,
    isEditModalOpen,
    handleCloseModal,
    handleOpenModal,
  };
}
