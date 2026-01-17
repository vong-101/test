import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "stepper"
  | "time";

import { QuantityStepper } from "./QuantityStepper";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomFormFieldProps {
  /**
   * Field name (must match schema property)
   */
  name: string;

  /**
   * Field label
   */
  label: string;

  /**
   * Input type
   * @default "text"
   */
  type?: FieldType;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Field description (helper text)
   */
  description?: string;

  /**
   * Options for select field
   */
  options?: SelectOption[];

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Additional className for Switch component
   */
  switchClassName?: string;

  /**
   * Additional input props
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  autoFocus?: boolean;
}

/**
 * Custom Form Field Component
 *
 * Reusable field component with automatic error handling
 *
 * @example
 * ```tsx
 * <CustomFormField
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   description="We'll never share your email"
 * />
 * ```
 */
export default function CustomFormField({
  name,
  label,
  type = "text",
  placeholder,
  description,
  options,
  disabled,
  className,
  switchClassName,
  inputProps,
  autoFocus,
}: CustomFormFieldProps) {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {type !== "checkbox" && type !== "switch" && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            {type === "textarea" ? (
              <textarea
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                className={cn(
                  " flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
            ) : type === "select" ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
              >
                <SelectTrigger className="w-full disabled:cursor-not-allowed disabled:opacity-50">
                  <SelectValue placeholder={placeholder || `ເລືອກ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
                <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {description || label}
                </label>
              </div>
            ) : type === "switch" ? (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">{label}</FormLabel>
                  {description && (
                    <FormDescription>{description}</FormDescription>
                  )}
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  className={switchClassName}
                />
              </div>
            ) : type === "stepper" ? (
              <QuantityStepper
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                className={className}
              />
            ) : type === "password" ? (
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  disabled={disabled}
                  autoFocus={autoFocus}
                  value={field.value ?? ""}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={field.onChange}
                  autoComplete="off"
                  {...inputProps}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={disabled}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                value={field.value ?? ""}
                className="disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => {
                  const value =
                    type === "number" ? e.target.valueAsNumber : e.target.value;
                  field.onChange(value);
                }}
                {...inputProps}
              />
            )}
          </FormControl>
          {description && type !== "checkbox" && type !== "switch" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
