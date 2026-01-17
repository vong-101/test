import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { BottomNav } from "@/components/common/BottomNav";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-slate-50 overflow-hidden md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
