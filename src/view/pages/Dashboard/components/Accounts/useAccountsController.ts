import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../Context/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { useBankAccount } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccount();

  // const { data, isFetching } = useQuery({
  //   queryKey: ["bankAccounts"],
  //   queryFn: bankAccountsService.getAll,
  // });

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => Number(total) + Number(account.currentBalance),
      0
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
  };
}
