import { NumericFormat } from "react-number-format";
export function InputCurrency() {
  return (
    <NumericFormat
      className="w-full text-gray-800 text-[32px] outline-none font-bold tracking-[-1px]"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue={0}
    />
  );
}
