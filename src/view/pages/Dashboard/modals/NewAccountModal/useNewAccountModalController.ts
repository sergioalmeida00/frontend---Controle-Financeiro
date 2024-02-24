import { useDashboard } from "../../components/Context/useDashboard";

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
