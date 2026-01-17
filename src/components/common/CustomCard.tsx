import React from "react";
import { cn } from "@/lib/utils";

export const CardContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-2 md:p-4 bg-white rounded-md shadow-sm border border-solid border-zinc-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardContainer.displayName = "CardContainer";

export function CardIcon({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-[8px] bg-black flex items-center justify-center text-white",
        className
      )}
    >
      {icon}
    </div>
  );
}

export const CardData = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border border-solid border-white min-w-[200px] min-h-[117px] rounded-[8px] bg-white p-3 shadow-[0_1px_2px_0_rgba(0,0,0,.25)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardData.displayName = "CardData";
