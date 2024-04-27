import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../Context/useDashboard";
import { useBankAccount } from "../../../../../app/hooks/useBankAccounts";

type BalanceByType = { [key: string]: number };

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [sliderSummary, setSliderSummary] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { accounts, isFetching } = useBankAccount();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => Number(total) + Number(account.currentBalance),
      0
    );
  }, [accounts]);

  const currentBalanceTypes = useMemo(() => {
    return accounts.reduce((acc: BalanceByType, account) => {
      // Se o tipo de conta ainda não estiver no acumulador, adiciona
      if (!acc[account.type]) {
        acc[account.type] = account.currentBalance;
      } else {
        // Caso contrário, soma ao saldo atual
        acc[account.type] += account.currentBalance;
      }

      return acc;
    }, {});
  }, [accounts]);

  const { CHECKING, INVESTMENT } = currentBalanceTypes;

  const summaryTotal = {
    currentBalance:{value:currentBalance, title: "Saldo Total"},
    checking: {value: CHECKING, title: "Conta Corrente"},
    investment: {value:INVESTMENT, title:"Investimentos"}
  }
  
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
    currentBalanceTypes,
    summaryTotal,
    sliderSummary,
    setSliderSummary
  };
}
