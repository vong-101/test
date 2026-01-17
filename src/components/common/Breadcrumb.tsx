import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({
  items,
  separator = <ChevronRight className="h-4 w-4 text-zinc-400" />,
  className = "",
}: BreadcrumbProps) {
  // Generate breadcrumb items from current route if not provided
  const breadcrumbItems: BreadcrumbItem[] = items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 ${className}`}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {item.icon && (
                  <span className="flex items-center">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-900">
                {item.icon && (
                  <span className="flex items-center">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </span>
            )}

            {!isLast && <span className="flex items-center">{separator}</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
