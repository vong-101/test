import { LayoutGrid, UserRound, Utensils } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
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

export function AppSidebar() {
  const activeLink = (isActive: boolean) => {
    return isActive
      ? "bg-teal-100 text-teal-800"
      : "hover:bg-zinc-100 transition-all duration-300";
  };

  return (
    <Sidebar variant="floating" className="min-h-screen bg-white p-0 ">
      <SidebarContent className="p-4">
        <SidebarHeader className="p-0">
          <p className="text-[32px] font-bold">ຮ້ານຕົ້ນນ້ຳ</p>
        </SidebarHeader>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5">
              {items.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-[8px]",
                      activeLink(isActive)
                    )
                  }
                >
                  <div>
                    <item.icon />
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
