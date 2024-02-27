import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
}
export function InputCurrency({ error }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "w-full text-gray-800 text-[32px] outline-none font-bold tracking-[-1px]",
          error && 'text-red-900'
        )}
        thousandSeparator="."
        decimalSeparator=","
        defaultValue={0}
      />

      {error && (
        <div className="text-red-900 flex gap-2 mt-2">
          <CrossCircledIcon />
          <span className=" text-xs"> {error} </span>
        </div>
      )}
    </div>
  );
}
