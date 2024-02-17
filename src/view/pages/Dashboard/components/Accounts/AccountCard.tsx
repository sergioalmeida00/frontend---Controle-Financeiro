import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountIcon } from "../../../../Components/icons/BankAccountIcon";
import { useDashboard } from "../Context/useDashboard";

interface AccountsProps {
  color: string;
  name: string;
  balance: number;
  type: "CASH" | "CHECKING" | "INVESTMENT";
}
export function AccountCard({ color, name, balance, type }: AccountsProps) {

  const {areValuesVisible} = useDashboard()
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountIcon key={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span className={cn("text-gray-800 font-medium tracking-[-0.5px] mt-4 block", !areValuesVisible && 'blur-sm')}>
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
