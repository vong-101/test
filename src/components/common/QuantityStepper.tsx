import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface QuantityStepperProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

export function QuantityStepper({
  value = 1,
  onChange,
  min = 1,
  max,
  className,
  disabled,
}: QuantityStepperProps) {
  const handleIncrement = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (max !== undefined && value >= max) return;
    onChange?.(value + 1);
  };

  const handleDecrement = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (value <= min) return;
    onChange?.(value - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      onChange?.(min);
      return;
    }

    let sanitizedValue = newValue;
    if (sanitizedValue < min) sanitizedValue = min;
    if (max !== undefined && sanitizedValue > max) sanitizedValue = max;

    onChange?.(sanitizedValue);
  };

  return (
    <div className={cn("flex gap-6 justify-center items-center", className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="w-[48px] h-[48px] flex justify-center items-center bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus className="size-5" />
      </button>

      <div className="w-24">
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="shadow-none text-2xl md:text-[30px] font-bold border-none bg-transparent focus-visible:ring-0 h-auto p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || (max !== undefined && value >= max)}
        className="w-[48px] h-[48px] flex justify-center items-center bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
