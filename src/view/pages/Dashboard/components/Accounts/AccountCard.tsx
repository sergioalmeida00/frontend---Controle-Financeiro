import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../Components/icons/BankAccountTypeIcon";
import { useDashboard } from "../Context/useDashboard";

interface AccountsProps {
  data: BankAccount;
}
export function AccountCard({ data }: AccountsProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  const { color, name, currentBalance, type } = data;
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] mt-4 block",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
