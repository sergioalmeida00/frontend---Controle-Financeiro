import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string;
  onChange?(value: string): void;
}
export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onValueChange={(event) => onChange?.(event.value)}
        className={cn(
          "text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full",
          error && "text-red-900"
        )}
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
