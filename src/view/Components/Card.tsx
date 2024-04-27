import { formatCurrency } from "../../app/utils/formatCurrency";
import { cn } from "../../app/utils/cn";
import { IncomeIcon } from "./icons/IncomeIcon";

interface CardProps {
  title: string;
  value: number;
  visible: boolean;
}
export function Card({ title, value, visible }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-2xl h-28 flex items-center gap-4">
      <div className="bg-teal-900 h-11 w-11 rounded-full flex justify-center items-center text-white">
        <IncomeIcon color={'#FFFFFF'}  />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-800 tracking-[-1px] font-medium"> {title} </span>
        <span className={cn(!visible && "blur-sm")}>
          {formatCurrency(value)}
        </span>
      </div>
    </div>
  );
}
