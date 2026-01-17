import { type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type UseFormReturn,
  type DefaultValues,
} from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CustomFormProps<T extends z.ZodType<any, any>> {
  id: string;
  schema: T;
  defaultValues?: DefaultValues<z.input<T>>;
  onSubmit: (data: z.output<T>) => void | Promise<void>;
  children:
    | ReactNode
    | ((form: UseFormReturn<z.input<T>, any, z.output<T>>) => ReactNode);
  submitText?: string;
  showSubmitButton?: boolean;
  submitButton?: ReactNode;
  cancleButton?: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default function CustomForm<T extends z.ZodType<any, any>>({
  id,
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = "ບັນທຶກ",
  showSubmitButton = true,
  submitButton,
  cancleButton,
  className,
  isLoading,
}: CustomFormProps<T>) {
  const form = useForm<z.input<T>, any, z.output<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (data: z.output<T>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  const isButtonLoading = isLoading || isSubmitting;

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className || "gap-6 flex flex-col h-full justify-between"}
      >
        {typeof children === "function" ? children(form) : children}

        <div className="flex justify-end items-center gap-4">
          {cancleButton}
          {showSubmitButton && !submitButton && (
            <Button
              type="submit"
              disabled={isButtonLoading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isButtonLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ກຳລັງບັນທຶກ...
                </>
              ) : (
                submitText
              )}
            </Button>
          )}
        </div>

        {submitButton}
      </form>
    </Form>
  );
}
