import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../Components/icons/BankAccountTypeIcon";
import { useDashboard } from "../Context/useDashboard";
import * as Progress from "@radix-ui/react-progress";

interface AccountsProps {
  data: BankAccount;
}
export function AccountCard({ data }: AccountsProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  const { color, name, currentBalance, type, currentGoal, goal } = data;
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div className="flex flex-row justify-between">
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-3 block">
          {name}
        </span>
      </div>

      {currentGoal && (
        <div>
          <Progress.Root
            className=" relative overflow-hidden bg-gray-400 rounded-full w-full h-[5px] mt-1"
            value={Number(currentGoal.toFixed(2))}
          >
            <Progress.Indicator
              className="bg-green-900 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
              style={{ transform: `translateX(-${100 - currentGoal}%)` }}
            />
          </Progress.Root>
          <small className={cn("text-gray-600 text-sm", !areValuesVisible && "blur-sm" )}>
            {`${currentGoal.toFixed(2)}%`} de {formatCurrency(goal)}
          </small>
        </div>
      )}

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
