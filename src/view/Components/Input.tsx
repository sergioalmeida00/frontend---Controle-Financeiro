import { CrossCircledIcon } from "@radix-ui/react-icons";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          className={cn(
            "w-full bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
            error && "!border-red-900",
            className
          )}
          id={id ?? name}
          name={name}
          placeholder=" "
          ref={ref}
        />
        <label
          id={id ?? name}
          htmlFor={name}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="text-red-900 flex gap-2 mt-2">
            <CrossCircledIcon />
            <span className=" text-xs"> {error} </span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
