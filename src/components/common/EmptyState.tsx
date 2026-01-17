import { type ReactNode } from "react";
import { SearchX, PackageX, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import noDataImage from "@/assets/images/no-data.png";

interface EmptyStateProps {
  /**
   * Icon to display. Can be:
   * - "default" | "search" | "package" | "cart" for predefined icons
   * - A custom React component
   */
  icon?: "default" | "search" | "package" | "cart" | ReactNode;
  /**
   * Main title text
   */
  title?: string;
  /**
   * Descriptive text below the title
   */
  description?: string;
  /**
   * Optional action button
   */
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
  };
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Size of the icon
   */
  iconSize?: number;
}

const iconMap = {
  search: SearchX,
  package: PackageX,
  cart: ShoppingCart,
};

export default function EmptyState({
  icon = "default",
  title = "ບໍ່ມີຂໍ້ມູນ",
  description,
  action,
  className = "",
  iconSize = 64,
}: EmptyStateProps) {
  const renderIcon = () => {
    if (icon === "default") {
      return (
        <img
          src={noDataImage}
          alt="No data"
          width={iconSize}
          height={iconSize}
          className="w-48 h-24"
        />
      );
    }
    if (typeof icon === "string" && icon in iconMap) {
      const IconComponent = iconMap[icon as keyof typeof iconMap];
      return (
        <IconComponent
          size={iconSize}
          className="text-gray-300"
          strokeWidth={1.5}
        />
      );
    }
    return icon;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="mb-4">{renderIcon()}</div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          variant={action.variant || "default"}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
