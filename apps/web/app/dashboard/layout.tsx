import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { AppNavbar } from "@/components/organism";
import { Separator } from "@repo/ui/components/separator";
import { Metadata } from "next";
import AppSidebarClient from "@/components/organism/app-sidebar-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Halaman dashboard BNN Kuningan",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex px-4">
      {/* <AppSidebar /> */}
      <AppSidebarClient />
      <main className="flex flex-col w-full">
        <div className="flex gap-3 items-center">
          <SidebarTrigger />
          <Separator orientation="vertical" className="max-h-8" />
          <AppNavbar />
        </div>
        <Separator />
        {children}
      </main>
    </SidebarProvider>
  );
}
