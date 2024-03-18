import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
  className?: string;
  placeholder?: string;
}
export function InputCurrency({
  error,
  onChange,
  value,
  className,
  placeholder,
}: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        placeholder={placeholder}
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onValueChange={(event) => onChange?.(event.value)}
        className={cn(
          "text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full",
          error && "text-red-900",
          className
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
