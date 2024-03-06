import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface ColorDropdownInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePikerInput({
  className,
  error,
  value,
  onChange,
}: ColorDropdownInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "w-full bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4 ",
              error && "!border-red-900",
              className
            )}
          >
            <span className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700">
              Data
            </span>
            <span> {formatDate(selectedDate)} </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="text-red-900 flex gap-2 mt-2">
          <CrossCircledIcon />
          <span className=" text-xs"> {error} </span>
        </div>
      )}
    </div>
  );
}
