import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../Components";
import { Button } from "../../../../../Components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}
const mockedAccounts = [
  {
    id: "12",
    name: "Inter",
  },
  {
    id: "13",
    name: "Dinheiro",
  },
  {
    id: "14",
    name: "Investimento",
  },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const { handleSelectBankAccount, selectedBankAccountId,selectedYear,handleChangeYear } = useFiltersModal();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {mockedAccounts.map((account) => (
            <button
              onClick={() => handleSelectBankAccount(account.id)}
              key={account.id}
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                account.id === selectedBankAccountId && "!bg-gray-200"
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Ano
        </span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button onClick={() => handleChangeYear(-1)} className="w-12 h-12 flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button onClick={() => handleChangeYear(1)} className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  );
}
