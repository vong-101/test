import { UserRound, LayoutGrid, Utensils } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "ລາຍການໂຕະ",
    url: "/table",
    icon: LayoutGrid,
  },
  {
    title: "ສັ່ງອາຫານ",
    url: "/order",
    icon: Utensils,
  },
  {
    title: "ໂປຣຟາຍ",
    url: "/profile",
    icon: UserRound,
  },
];

export function BottomNav() {
  const activeLink = (isActive: boolean) => {
    return isActive ? "text-teal-600" : "text-zinc-500 hover:text-zinc-700";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200",
                activeLink(isActive)
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
